import React, { useState } from "react";
import { Search } from "lucide-react";
import FilterOptions from "./FilterOptions";

function Searchbar({ searchHandler }) {
  const [filter, setFilter] = useState("all");
  const [text, setText] = useState("");

  const filterHandler = ({ filter }) => {
    setFilter(filter);
    searchHandler({ text, filter });
  };

  return (
    <div className="flex relative w-full">
      <input
        className="bg-white rounded-xl px-5 py-3 ps-14 outline-none border-2 border-transparent focus:border-primary w-full duration-300"
        placeholder="Search for a post..."
        value={text}
        onChange={(e) => {
          searchHandler({ text: e.target.value, filter });
          setText(e.target.value);
        }}
      ></input>
      <Search size={24} color="gray" className="absolute top-3 left-5"></Search>
      <FilterOptions filterHandler={filterHandler}></FilterOptions>
    </div>
  );
}

export default Searchbar;
