import React from "react";
import { Search } from "lucide-react";

function Searchbar({ searchHandler }) {
  return (
    <div className="flex relative w-[720px]">
      <input
        className="bg-white rounded-xl px-5 py-3 ps-14 outline-none border-2 border-transparent focus:border-primary w-full duration-300"
        placeholder="Search for a post..."
        onChange={(e) => {

          searchHandler({ text: e.target.value })
        }}
      ></input>
      <Search size={24} color="gray" className="absolute top-3 left-5"></Search>
    </div>
  );
}

export default Searchbar;
