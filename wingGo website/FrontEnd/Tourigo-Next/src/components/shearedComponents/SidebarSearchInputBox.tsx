import useGlobalContext from "@/hooks/use-context";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface propsType {
  placeHolder?: string;
}

const SidebarSearchInputBox = ({ placeHolder }: propsType) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { setFilterSearch, setNiceSelectData, setFilterRange } =
    useGlobalContext();
  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFilterSearch(searchQuery);
  };

  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setFilterSearch(event.target.value);
    setNiceSelectData("");
    setFilterRange([]);
  };

  return (
    <>
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
          {"  "}
          <i className="far fa-search"></i>{" "}
        </button>
      </form>
    </>
  );
};

export default SidebarSearchInputBox;
