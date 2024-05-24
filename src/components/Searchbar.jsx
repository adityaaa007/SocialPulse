import React, { useState } from "react";
import { Search } from "lucide-react";
import FilterOptions from "./FilterOptions";
import { useSelector } from "react-redux";

function Searchbar({ searchHandler }) {
  const [filter, setFilter] = useState("all");
  const [text, setText] = useState("");
  const lightTheme = useSelector((state) => state.settings.lightTheme);

  const filterHandler = ({ filter }) => {
    setFilter(filter);
    searchHandler({ text, filter });
  };

  return (
    <div className="flex relative w-full">
      <input
        className={`${lightTheme ? 'bg-white text-black' : "bg-tertiary text-white"} rounded-xl px-5 py-3 ps-14 outline-none border-2 border-transparent focus:border-primary w-full duration-300`}
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
