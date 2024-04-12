import React from "react";
import logo from "../assets/dashboard_logo.jpg";

function Logo({ src, ...props }) {
  return <img src={src ? src : logo} alt="" height={48} width={48} {...props}/>;
}

export default Logo;
