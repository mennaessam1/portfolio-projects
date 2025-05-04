//SidebarSearchInputBoxPlaces.tsx
// SidebarSearchInputBox.tsx
import React, { useState } from "react";

interface SidebarSearchInputBoxProps {
  placeHolder: string;
  onSearch: (query: string) => void;
}

const SidebarSearchInputBox = ({ placeHolder, onSearch }: SidebarSearchInputBoxProps) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Pass the query to the parent component
  };

  return (
    <input
      type="text"
      placeholder={placeHolder}
      value={query}
      onChange={handleInputChange}
      className="sidebar-search-input"
    />
  );
};

export default SidebarSearchInputBox;
