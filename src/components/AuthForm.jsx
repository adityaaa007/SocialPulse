import React from "react";
import logo from "../assets/logo.png";
import FormInput from "./FormInput";
import Button from "./Button";
import authService from "../services/authService";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function AuthForm({ page, buttonTxt }) {

  const { register, handleSubmit } = useForm();
  const lightTheme = useSelector((state) => state.settings.lightTheme);

  const clickHandler = () => {
    if(page === 'signup') {
      authService
    }
  }

  return (
    <div className={`lg:absolute top-0 right-0 z-50 ${lightTheme ? 'bg-bgLight' : 'bg-bgDark'} w-full lg:w-1/2 h-auto lg:h-screen flex flex-col items-center lg:items-start justify-center px-8 lg:px-24 py-16 rounded-bl-3xl rounded-br-3xl lg:rounded-tl-3xl lg:rounded-bl-3xl`}>
      <img src={logo} alt="" height={90} width={90} />

      <h3 className="font-bold text-black z-10 text-xl mt-8">Welcome back</h3>

      <p className="text-neutral-400 mt-1 mb-4">Sign in to continue</p>
      {page === "signup" ? (
        <FormInput
          label={"NAME"}
          placeholder={"John Cena"}
          type={"text"}
          style={"mt-4"}
        ></FormInput>
      ) : null}

      <FormInput
        label={"EMAIL"}
        placeholder={"user@email.com"}
        type={"email"}
        style={"mt-4"}
      ></FormInput>
      <FormInput
        label={"PASSWORD"}
        placeholder={"Password@123"}
        type={"password"}
        style={"mt-4"}
      ></FormInput>
      {page === "login" ? (
        <a className="text-primary font-medium mt-2" href="#">
          Forgot password?
        </a>
      ) : null}

      <Button style={"lg:w-96 w-fit mt-8"}>{buttonTxt}</Button>
    </div>
  );
}

export default AuthForm;
