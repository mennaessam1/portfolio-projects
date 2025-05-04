// SidebarSearchInputBoxIt.tsx
import React, { ChangeEvent, FormEvent, useState } from "react";

interface PropsType {
  placeHolder?: string;
  onSearch: (query: string) => void; // New prop to trigger search in parent component
}

const SidebarSearchInputBoxIt = ({ placeHolder, onSearch }: PropsType) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchQuery); // Call the search function passed as a prop
  };

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query); // Trigger search on every input change
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="sidebar-search-form"
      action="#"
      method="get"
    >
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
        name="s"
        placeholder={`Search ${placeHolder ? placeHolder : ""}`}
      />
      <button type="submit">
        <i className="far fa-search"></i>
      </button>
    </form>
  );
};

export default SidebarSearchInputBoxIt;
