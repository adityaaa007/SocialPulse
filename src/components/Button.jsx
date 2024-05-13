import React from "react";

function Button({ children, style, clickHandler, type = "button" }) {
  return (
    <button
      type={type}
      className={`font-semibold text-white px-6 py-3 rounded-full z-10 duration-300 ${style}`}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}

export default Button;
