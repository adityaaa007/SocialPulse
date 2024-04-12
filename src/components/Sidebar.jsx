// Sidebar.js
import React, { useState } from "react";
import { Home, Mail, User, Settings } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { LogOut } from "lucide-react";
import { logout } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import Logo from "./Logo";
import logo from "../assets/dashboard_logo_white.jpg";
import authService from "../services/authService";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`bg-primary text-white h-screen ${
        isExpanded ? "w-52" : "w-28"
      } transition-all duration-300 px-8 flex flex-col sticky top-0`}
    >
      <Logo src={logo} className="mt-8 mb-4 self-center"></Logo>
      <div className="flex justify-center items-center h-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-neutral-200 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={toggleSidebar}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isExpanded ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </div>
      {/* Sidebar content goes here */}
      <ul className="flex flex-col gap-5 items-start relative h-screen">
        <SidebarItem
          icon={
            <Home color={selected === "home" ? "#666BED" : "white"} size={24} />
          }
          isExpanded={isExpanded}
          isSelected={selected === "home"} // Pass isSelected prop based on selected state
          onClick={() => setSelected("home")} // Set selected state when clicked
        >
          Home
        </SidebarItem>
        <SidebarItem
          icon={
            <Mail
              color={selected === "messages" ? "#666BED" : "white"}
              size={24}
            />
          }
          isExpanded={isExpanded}
          isSelected={selected === "messages"} // Pass isSelected prop based on selected state
          onClick={() => setSelected("messages")} // Set selected state when clicked
        >
          Messages
        </SidebarItem>
        <SidebarItem
          icon={
            <User
              color={selected === "profile" ? "#666BED" : "white"}
              size={24}
            />
          }
          isExpanded={isExpanded}
          isSelected={selected === "profile"} // Pass isSelected prop based on selected state
          onClick={() => setSelected("profile")} // Set selected state when clicked
        >
          Profile
        </SidebarItem>
        <SidebarItem
          icon={
            <Settings
              color={selected === "settings" ? "#666BED" : "white"}
              size={24}
            />
          }
          isExpanded={isExpanded}
          isSelected={selected === "settings"} // Pass isSelected prop based on selected state
          onClick={() => setSelected("settings")} // Set selected state when clicked
        >
          Settings
        </SidebarItem>

        {/* Logout button */}
        <a
          onClick={async () => {
            dispatch(logout());
            await authService.logout();
          }}
          href="#"
          className={`flex gap-3 py-[10px] px-[10px] border-2 border-white/50 rounded-lg hover:bg-white/10 ${
            isExpanded ? "w-full justify-start" : "w-auto justify-center"
          } duration-300 absolute bottom-4`}
        >
          <LogOut color="white" size={24} />
          <p
            className={`text-white font-medium text-base ${
              isExpanded ? "block" : "hidden"
            } transition-all duration-300`}
          >
            Logout
          </p>
        </a>
      </ul>
    </div>
  );
};

export default Sidebar;
