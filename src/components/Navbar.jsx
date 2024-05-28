// Navbar.jsx
import React, { useState } from "react";
import { Home, User, Settings } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { LogOut } from "lucide-react";
import { logout } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Logo from "./Logo";
import logo from "../assets/dashboard_logo_white.png";
import authService from "../services/authService";
import { removeData } from "../features/database/databaseSlice";
import { useNavigate } from "react-router-dom";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import LargeSidebar from "./LargeSidebar";

const Navbar = ({ initialPage }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selected, setSelected] = useState(initialPage);
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.userData.name);
  const navigate = useNavigate();
  const lightTheme = useSelector((state) => state.settings.lightTheme);
  const [panelOpen, setPanelOpen] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`bg-primary text-white h-auto w-full justify-between items-center ${
        isExpanded ? "w-52" : "w-28"
      } transition-all duration-300 px-8 flex flex-col sticky top-0 md:hidden`}
    >
      <div className="flex flex-row justify-between items-center w-full">
        <Logo src={logo} className="m-4 self-center"></Logo>
        <div className="flex justify-center items-center h-16 gap-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 ${
              lightTheme ? "text-neutral-200" : "text-neutral-700"
            } cursor-pointer`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={toggleSidebar}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isExpanded ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>

          <PanelRightOpen
            size={40}
            color={lightTheme ? "black" : "#404040"}
            className={`p-2 rounded-full ${panelOpen ? "hidden" : "block"}`}
            onClick={() => {
              setPanelOpen(!panelOpen);
            }}
          ></PanelRightOpen>

          <PanelRightClose
            size={40}
            color={lightTheme ? "black" : "#404040"}
            className={`p-2 rounded-full ${panelOpen ? "block" : "hidden"}`}
            onClick={() => {
              setPanelOpen(!panelOpen);
            }}
          ></PanelRightClose>
          <LargeSidebar hidden={!panelOpen}></LargeSidebar>
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        {/* Sidebar content goes here */}
        <ul
          className={`${
            isExpanded ? "flex" : "hidden"
          } flex-col gap-5 items-start relative h-auto pb-8 transition-all duration-300`}
        >
          <span
            className={`text-white ${
              lightTheme ? "text-white" : "text-black/70"
            } transition-all duration-300`}
          >
            <span
              className={`font-regular ${
                lightTheme ? "text-white" : "text-black/70"
              }`}
            >
              Hello,
            </span>{" "}
            <br></br>
            <span
              className={`font-bold ${
                lightTheme ? "text-white" : "text-black/70"
              }`}
            >
              {name}
            </span>
          </span>
          <SidebarItem
            icon={
              <Home
                color={
                  selected === "home"
                    ? "#666BED"
                    : `${lightTheme ? "white" : "#00000080"}`
                }
                size={24}
              />
            }
            isExpanded={isExpanded}
            isSelected={selected === "home"} // Pass isSelected prop based on selected state
            onClick={() => {
              setSelected("home");
              navigate("/");
            }} // Set selected state when clicked
          >
            Home
          </SidebarItem>
          <SidebarItem
            icon={
              <User
                color={
                  selected === "profile"
                    ? "#666BED"
                    : `${lightTheme ? "white" : "#00000080"}`
                }
                size={24}
              />
            }
            isExpanded={isExpanded}
            isSelected={selected === "profile"} // Pass isSelected prop based on selected state
            onClick={() => {
              setSelected("profile");
              navigate("/profile");
            }} // Set selected state when clicked
          >
            Profile
          </SidebarItem>
          <SidebarItem
            icon={
              <Settings
                color={
                  selected === "settings"
                    ? "#666BED"
                    : `${lightTheme ? "white" : "#00000080"}`
                }
                size={24}
              />
            }
            isExpanded={isExpanded}
            isSelected={selected === "settings"} // Pass isSelected prop based on selected state
            onClick={() => {
              setSelected("settings");
              navigate("/settings");
            }} // Set selected state when clicked
          >
            Settings
          </SidebarItem>
          {/* Logout button */}
          <a
            onClick={async () => {
              dispatch(logout());
              dispatch(removeData());
              await authService.logout();
            }}
            href="#"
            className={`flex gap-3 py-[10px] px-[10px] border-2 ${
              lightTheme
                ? "hover:bg-white/10 border-white/50"
                : "hover:bg-black/10 border-black/20"
            } rounded-lg  ${
              isExpanded ? "w-full justify-start" : "w-auto justify-center"
            } duration-300`}
          >
            <LogOut color={`${lightTheme ? "white" : "#00000080"}`} size={24} />
            <p
              className={`${
                lightTheme ? "text-white" : "text-black/70"
              } font-medium text-base ${
                isExpanded ? "block" : "hidden"
              } transition-all duration-300`}
            >
              Logout
            </p>
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
