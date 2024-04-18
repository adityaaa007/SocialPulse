import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";

function Searchbar({ searchHandler }) {
  return (
    <div className="flex relative w-full">
      <input
        className="bg-white rounded-xl px-5 py-3 ps-14 outline-none border-2 border-transparent focus:border-primary w-full duration-300"
        placeholder="Search for a post..."
        onChange={(e) => {
          searchHandler({ text: e.target.value });
        }}
      ></input>
      <Search size={24} color="gray" className="absolute top-3 left-5"></Search>
      <button className="flex text-gray-400 font-medium p-2 absolute right-5 top-2 text-sm items-center hover:bg-gray-100 rounded-lg">
        <SlidersHorizontal
          size={20}
          color="#9CA3AF"
          className="me-4"
        ></SlidersHorizontal>
        FILTERS
      </button>
    </div>
  );
}

export default Searchbar;
