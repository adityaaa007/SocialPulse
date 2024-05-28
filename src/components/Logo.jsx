import React from "react";
import logo from "../assets/dashboard_logo.png";

function Logo({ src, ...props }) {
  return <img src={src ? src : logo} alt="" height={100} width={125} {...props}/>;
}

export default Logo;
