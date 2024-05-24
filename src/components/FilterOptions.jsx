import React, { useState } from "react";
import { SlidersHorizontal, Check } from "lucide-react";
import { useSelector } from "react-redux";

function FilterOptions({ filterHandler }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("all");
  const lightTheme = useSelector((state) => state.settings.lightTheme);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute right-5 top-2">
      <button
        className={`flex text-gray-400 font-medium p-2 text-sm items-center ${
          lightTheme ? "hover:bg-gray-100" : "hover:bg-neutral-700"
        } rounded-lg`}
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
        <div
          className={`absolute top-full right-0 mt-2 ${
            lightTheme
              ? "bg-white border-gray-200"
              : "bg-tertiary border-neutral-700"
          } border rounded shadow-md z-10`}
        >
          <ul>
            <li
              className={`px-2 py-2 ${
                lightTheme ? "hover:bg-gray-100" : "hover:bg-neutral-700"
              } cursor-pointer flex items-center w-32 ${
                selected !== "all" && "ps-9"
              }`}
              onClick={() => {
                filterHandler({ filter: "all" });
                setSelected("all");
                toggleMenu();
              }}
            >
              <Check
                size={20}
                color="#22C55E"
                className={`me-2 ${selected !== "all" && "hidden"}`}
              ></Check>
              <span className={`${lightTheme ? 'text-black' : "text-white"}`}>All</span>
            </li>
            <li
              className={`px-2 py-2 ${
                lightTheme ? "hover:bg-gray-100" : "hover:bg-neutral-700"
              } cursor-pointer flex items-start w-32 ${
                selected !== "following" && "ps-9"
              }`}
              onClick={() => {
                filterHandler({ filter: "following" });
                setSelected("following");
                toggleMenu();
              }}
            >
              <Check
                size={20}
                color="#22C55E"
                className={`me-2 ${selected !== "following" && "hidden"}`}
              ></Check>
              <span className={`${lightTheme ? 'text-black' : "text-white"}`}>Following</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default FilterOptions;
