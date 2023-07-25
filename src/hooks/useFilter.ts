import { useCallback, useEffect, useState } from "react"
import { debounce } from "../helpers/debounce";
import { search } from "../helpers/search";

export const useFilter = (query: string, data: string[], debounceTimer: number = 1500) => {
  const [searchQuery, setSearchQuery] = useState<string>(query);
  const [filteredData, setFilteredData] = useState<string[]>([]);

  const filterOptions = useCallback(
    debounce(async (searchQuery: string) => {
      if (data) {
        const filteredData = search(searchQuery, data);
        setFilteredData(filteredData)
      }
    }
  , debounceTimer), [data])

  useEffect(() => {
    filterOptions(searchQuery)
  }, [searchQuery])

  return {
    filteredData,
    setSearchQuery,
  }
}