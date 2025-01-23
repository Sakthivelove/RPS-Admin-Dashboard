// components/SearchBar.tsx

import React, { useState, ChangeEvent, useEffect } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa'; // Importing search and filter icons

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (searchTerm: string | undefined) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      // Trigger the search when the user stops typing for 500ms
      onSearch?.(searchTerm.trim() === '' ? undefined : searchTerm);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer); // Cleanup the timer on component unmount or searchTerm change
  }, [searchTerm, onSearch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler); // Cleanup on unmount or search term change
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm && onSearch) {
      onSearch(debouncedSearchTerm); // Trigger search after debounce
    }
  }, [debouncedSearchTerm, onSearch]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (onSearch) {
      onSearch(searchTerm); // Call onSearch only if it exists
    }
    // Propagate search term to the parent
  };

  console.log("searchbar", searchTerm, debouncedSearchTerm);
  console.log("onSearch searchbar",onSearch,searchTerm);
  


  return (
    <div className="flex items-center bg-[#1A1D26] border border-[#969EB2] rounded-lg p-2">
      {/* Search icon on the left */}
      <FaSearch className="text-[#969EB2] text-lg mr-2 ml-2" />

      {/* Search input */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={placeholder || 'Search...'}
        className="bg-transparent text-white placeholder-[#969EB2] focus:outline-none w-full"
      />

      {/* Filter icon on the right */}
      <FaFilter className="text-[#969EB2] text-lg ml-2" />
    </div>
  );
};

export default SearchBar;
