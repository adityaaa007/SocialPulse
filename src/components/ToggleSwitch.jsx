import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/settings/settingsSlice.js";

const ToggleSwitch = () => {
  const lightTheme = useSelector((state) => state.settings.lightTheme);
  const dispatch = useDispatch();

  const toggleSwitch = () => {
    dispatch(toggleTheme());
  };

  return (
    <div
      className={`w-14 h-8 flex mt-2 items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        lightTheme ? "bg-primary" : "bg-gray-300"
      }`}
      onClick={toggleSwitch}
    >
      <div
        className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
          lightTheme ? "translate-x-6 bg-white" : "bg-black"
        }`}
      ></div>
    </div>
  );
};

export default ToggleSwitch;
