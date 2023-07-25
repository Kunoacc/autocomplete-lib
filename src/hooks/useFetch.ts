import { useCallback, useState, useEffect, useRef } from 'react';

type FetchProps = RequestInit & {
  key?: string;
  revalidationTime?: number;
}

interface CacheValue<T> {
  data: T;
  timestamp: number;
}

/**
 * This hook is used to fetch data from an API endpoint.
 * the hook also handles caching of the data and revalidation.
 * @param url  The API endpoint to fetch data from.
 * @param options The options to pass to the fetch function.
 * @returns 
 */
export const useApiFetch = <T>(url: string, options?: FetchProps) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const { key, revalidationTime = 30000, ...fetchOptions } = options || {};

  // Cache object
  const cache = useRef<Map<string, CacheValue<T>>>(new Map());

  const fetchData = useCallback(async (shouldUseCache = true) => {
    const cacheKey = `${url}`;

    // If cached data is available then use it
    const cachedData = cache.current.get(cacheKey);
    if (shouldUseCache && cachedData) {
      const { data, timestamp } = cachedData;
      if (Date.now() - timestamp < revalidationTime) {
        setData(data);
        setLoading(false);
        return;
      }
      // if not, then data is stale so remove it from cache
      cache.current.delete(cacheKey);
    } else {
      try {
        const response = await fetch(url, {
          // Ideally this key should be stored in an environment variable, but for the sake of simplicity I'm hardcoding it here.
          // Also since the requirements does not allow external packages, and i can't use a library like dotenv to load environment variables,
          headers: {
            "x-api-key": "live_g39NlFFIH6p2uUvrX2ykOPN1kmuMXb7pinaWHrDm2h6rG58ciynbDjYJ8yhS4dij"
          },
          ...fetchOptions
        });
        const newData = await response.json();
        setData(newData);

        // Save the new data in cache
        cache.current.set(cacheKey, { data: newData, timestamp: Date.now() });
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }
  }, [url, key, revalidationTime]);

  // revalidate function to clear cache and fetch data again from the API when required
  const revalidate = useCallback(() => {
    cache.current.clear();
    fetchData(false);
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, revalidate };
}