import { useState } from 'react'
import { API_BASE_URL } from '../../constants';
import { useApiFetch } from '../../hooks/useFetch';
import { CatsResponse } from '../../interfaces/ApiResponse.interface';
import Autocomplete from '../Autocomplete/Autocomplete';

function App() {
  const [refreshKey, setRefreshKey] = useState<string>("");
  const [selectedCat, setSelectedCat] = useState<string>("");

  const api = new URL(API_BASE_URL + "/breeds")
  api.searchParams.append("page", "0")
  api.searchParams.append("limit", "1000")

  const { data, loading, error } = useApiFetch<CatsResponse>(api.toString(), { key: refreshKey })
  const options = data?.map((cat) => ({ label: cat.id, value: cat.name })) || []

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  if (error) {
    return (
      <div>Error: {error.message}</div>
    )
  }

  return (
    <>
      <p>Selected Cat: {selectedCat}</p>
      <Autocomplete
        optionFetcher={(key: string) => setRefreshKey(key)}
        options={options}
        selectedOptionSetter={(option) => setSelectedCat(option?.value as string)}
      />
    </>
  )
}

export default App
