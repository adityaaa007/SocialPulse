import React from "react";
import { useSelector } from "react-redux";

function SidebarItem({ icon, children, isExpanded, isSelected, onClick }) {
  const lightTheme = useSelector((state) => state.settings.lightTheme);
  return (
    <a
      href="#"
      className={`flex gap-3 py-3 px-3 rounded-lg ${
        isSelected ? `${lightTheme ? 'bg-white' : "bg-black/70"}` : `${lightTheme ? 'bg-white/20 hover:bg-white/10' : "bg-black/10 hover:bg-black/5"}`
      } ${
        isExpanded ? "w-full justify-start" : "w-auto justify-center"
      } items-center duration-300`}
      onClick={onClick}
    >
      {icon}
      <p
        className={`font-medium text-base ${
          isExpanded ? "block" : "hidden"
        } ${isSelected ? 'text-primary' : `${lightTheme ? 'text-white' : "text-black/60"}`}`}
      >
        {children}
      </p>
    </a>
  );
}

export default SidebarItem;
