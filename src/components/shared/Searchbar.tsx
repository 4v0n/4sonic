import React, { useState } from "react";

interface SeachBarProps {
  placeholder?: string;
  onType: (query: string) => void;
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<SeachBarProps> = ({
  placeholder = "Search",
  onType,
  onSearch,
}) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onType(newQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className="button flex w-64 h-10 items-center justify-start rounded-full px-2">
      <img src="search.svg" />
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full focus:outline-none items-center"
      />
    </div>
  );
};

export default SearchBar;