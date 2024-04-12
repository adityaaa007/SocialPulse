import React from "react";
import LoginImage from "../assets/login_image.jpeg";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function AuthHero({ text, buttonTxt }) {
  const navigate = useNavigate();

  const clickHandler = () => {
    if (buttonTxt === "Login") navigate("/login", { replace: true });
    else navigate("/signup", { replace: true });
  };

  return (
    <div
      className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-cover gap-3 py-16 relative h-72 lg:h-screen"
      style={{ backgroundImage: `url(${LoginImage})` }}
    >
      <div className="absolute w-full lg:w-full op-0 left-0 bg-black opacity-40 h-72 lg:h-screen"></div>

      <h3 className="font-medium text-white z-10 text-3xl">Hello!</h3>
      <p className="text-neutral-300 z-10">{text}</p>
      <Button style={"w-fit lg:w-64"} clickHandler={clickHandler}>
        {buttonTxt}
      </Button>
    </div>
  );
}

export default AuthHero;
