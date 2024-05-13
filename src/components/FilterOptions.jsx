import React, { useState } from "react";
import { SlidersHorizontal, Check } from "lucide-react";

function FilterOptions({ filterHandler }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("all");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute right-5 top-2">
      <button
        className="flex text-gray-400 font-medium p-2 text-sm items-center hover:bg-gray-100 rounded-lg"
        onClick={toggleMenu}
      >
        <SlidersHorizontal
          size={20}
          color="#9CA3AF"
          className="me-4"
        ></SlidersHorizontal>
        FILTERS
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded shadow-md z-10">
          <ul>
            <li
              className={`px-2 py-2 hover:bg-gray-100 cursor-pointer flex items-center w-32 ${selected !== 'all' && 'ps-9'}`}
              onClick={() => {
                filterHandler({ filter: "all" });
                setSelected("all");
                toggleMenu()
              }}
            >
              <Check size={20} color="#22C55E" className={`me-2 ${selected !== 'all' && 'hidden'}`}></Check>All
            </li>
            <li
              className={`px-2 py-2 hover:bg-gray-100 cursor-pointer flex items-start w-32 ${selected !== 'following' && 'ps-9'}`}
              onClick={() => {
                filterHandler({ filter: "following" });
                setSelected("following");
                toggleMenu()
              }}
            >
              <Check size={20} color="#22C55E" className={`me-2 ${selected !== 'following' && 'hidden'}`}></Check>
              Following
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default FilterOptions;
