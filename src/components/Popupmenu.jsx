import React, { useState } from "react";
import { EllipsisVertical } from "lucide-react";

function Popupmenu({ author }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    // Handle item click
    console.log("Clicked on:", item);
    // Close the menu after clicking an item
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <EllipsisVertical
        size={40}
        color="gray"
        className="hover:bg-neutral-100 active:bg-neutral-200 p-2 rounded-full"
        onClick={toggleMenu}
      ></EllipsisVertical>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded shadow-md">
          <ul>
            <li
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                author ? "block" : "hidden"
              }`}
              onClick={() => handleItemClick("Option 1")}
            >
              Delete
            </li>
            <li
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                author ? "block" : "hidden"
              }`}
              onClick={() => handleItemClick("Option 2")}
            >
              Edit
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleItemClick("Option 3")}
            >
              Save
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Popupmenu;
