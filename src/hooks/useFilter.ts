import { useCallback, useEffect, useState } from "react"
import { debounce } from "../helpers/debounce";
import { search } from "../helpers/search";

export const useFilter = (query: string, data: string[]) => {
  const [searchQuery, setSearchQuery] = useState<string>(query);
  const [filteredData, setFilteredData] = useState<string[]>([]);

  const filterOptions = useCallback(
    debounce(async (searchQuery: string) => {
      if (data) {
        const filteredData = search(searchQuery, data);
        setFilteredData(filteredData)
      }
    }
  , 1500), [data])

  useEffect(() => {
    filterOptions(searchQuery)
  }, [searchQuery])

  return {
    filteredData,
    setSearchQuery,
  }
}