import React from "react";

function SidebarItem({ icon, children, isExpanded, isSelected, onClick }) {
  return (
    <a
      href="#"
      className={`flex gap-3 py-3 px-3 rounded-lg ${
        isSelected ? "bg-white" : "bg-white/20 hover:bg-white/10"
      } ${
        isExpanded ? "w-full justify-start" : "w-auto justify-center"
      } items-center duration-300`}
      onClick={onClick}
    >
      {icon}
      <p
        className={`font-medium text-base ${
          isExpanded ? "block" : "hidden"
        } ${isSelected ? 'text-primary' : 'text-white'}`}
      >
        {children}
      </p>
    </a>
  );
}

export default SidebarItem;
