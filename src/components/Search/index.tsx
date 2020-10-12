import React from "react";
import debounce from "lodash/debounce";

import { Input } from "./styles";

const DEBOUNCE_TIME = 300;

type PropsType = {
  placeholder: string;
  onchange: (value: string) => void;
};

const Search = ({ placeholder, onchange }: PropsType) => {
  const handleOnChange = debounce(onchange, DEBOUNCE_TIME);

  return (
    <Input
      placeholder={placeholder}
      onChange={e => handleOnChange(e.target.value)}
      data-testid="search-input"
    />
  );
};

export default Search;