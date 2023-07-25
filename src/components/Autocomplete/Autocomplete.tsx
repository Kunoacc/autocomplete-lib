import { useState } from "react";
import styles from "./Autocomplete.module.scss";
import { useFilter } from "../../hooks/useFilter";
import HighlightableResult from "../HighlightedResult/HighlightedResult";

export interface Option {
  label: string;
  value: string;
}

interface AutoCompleteProps { 
  options: Option[];
  optionFetcher: (query: string) => void;
  selectedOptionSetter?: (option: Option) => void;
}

const Autocomplete: React.FC<AutoCompleteProps> = ({ optionFetcher, options, selectedOptionSetter }) => {
  const [query, setQuery] = useState<string>("");

  const { filteredData, setSearchQuery } = useFilter(query, options.map((option) => option.value));

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
    optionFetcher(e.target.value);
  }

  const selectOption = (option: string) => {
    selectedOptionSetter && selectedOptionSetter(options.find((opt) => opt.label === option) as Option);
    setQuery(option);
  }

  return (
    <div className={styles.autocomplete}>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={onInputChange}
      />
      {filteredData.length > 0 && (
        <ul className={styles.autocomplete__results}>
          {filteredData.map((option, i) => (
            <li
              key={i}
              className={styles.autocomplete__results__item}
              onClick={() => selectOption(option)}
            >
              <HighlightableResult
                text={option}
                query={query}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Autocomplete;