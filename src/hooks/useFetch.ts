import { useCallback, useState, useEffect } from 'react';

type FetchProps = RequestInit & {
  key?: string;
}

/**
 * This hook is used to fetch data from an API endpoint.
 * @param url  The API endpoint to fetch data from.
 * @param options The options to pass to the fetch function.
 * @returns 
 */
export const useApiFetch = <T>(url: string, options?: FetchProps) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const { key, ...fetchOptions } = options || {};

  const fetchData = useCallback(async () => {
    key;
    try {
      const response = await fetch(url, {
          headers: {
            "x-api-key": "live_g39NlFFIH6p2uUvrX2ykOPN1kmuMXb7pinaWHrDm2h6rG58ciynbDjYJ8yhS4dij"
        },
        ...fetchOptions
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [url, key]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
}