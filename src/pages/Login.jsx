import React, { useState } from "react";
import AuthHero from "../components/AuthHero";
import FormInput from "../components/FormInput.jsx";
import Button from "../components/Button.jsx";
import authService from "../services/authService.js";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin } from "../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";

function Login() {
  const { register, handleSubmit } = useForm();
  const lightTheme = useSelector(state => state.settings.lightTheme)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const login = async (data) => {
    // setLoading(true);
    setError("");
    try {
      const userData = await authService.loginWithEmail(data);
      if (userData) {
        dispatch(
          authLogin({
            name: userData.displayName,
            uid: userData.uid,
            email: userData.email,
          })
        );
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
    // setLoading(false);
  };

  const theme = useSelector(state => state.database.theme)


  return (
    <div className="w-full min-h-screen flex flex-col-reverse lg:flex-row">
      <AuthHero
        text={"Don`t have an account yet?"}
        buttonTxt={"Create and account"}
      ></AuthHero>
      <div className={`lg:absolute top-0 right-0 z-40 ${lightTheme ? 'bg-bgLight' : 'bg-bgDark'} w-full lg:w-1/2 h-auto lg:h-screen flex flex-col items-center lg:items-start justify-center px-8 lg:px-24 py-16`}>
        <Logo></Logo>

        <h3 className={`font-bold ${lightTheme ? "text-black" : "text-white"} z-10 text-xl mt-8`}>Welcome back</h3>

        <p className="text-neutral-400 mt-1 mb-4">Sign in to continue</p>

        <form onSubmit={handleSubmit(login)}>
          <FormInput
            label={"EMAIL"}
            placeholder={"user@email.com"}
            type={"email"}
            style={"mt-4"}
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Enter a valid email",
              },
            })}
          ></FormInput>
          <FormInput
            label={"PASSWORD"}
            placeholder={"Password@123"}
            type={"password"}
            style={"mt-4"}
            {...register("password", { required: true })}
          ></FormInput>
          <a className="text-primary font-medium mt-2" href="#">
            Forgot password?
          </a>

          <p className="text-red-500 mt-2">{error}</p>

          <Button type="submit" style={"lg:w-96 w-fit mt-8 hover:bg-indigo-600 bg-primary"}>
            Login
          </Button>
        </form>

      </div>
    </div>
  );
}

export default Login;
