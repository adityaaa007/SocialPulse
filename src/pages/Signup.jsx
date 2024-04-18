import React, { useState } from "react";
import AuthHero from "../components/AuthHero";
import FormInput from "../components/FormInput.jsx";
import Button from "../components/Button.jsx";
import authService from "../services/authService.js";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import databaseService from "../services/databaseService.js";

function Signup() {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const signup = async (data) => {
    // setLoading(true);
    setError("");
    try {
      const userData = await authService.createUser({
        email: data.email,
        password: data.password,
      });
      if (userData) {
        const userDataWithName = await authService.updateUserProfile({
          name: data.name,
        });
        if (userDataWithName) {
          await databaseService.setDocument({
            collectionId: "users",
            documentId: userDataWithName.uid,
            data: { imagePath: "", likedPosts: [], name: data.name, address: data.address, following:[] },
          });
          dispatch(
            authLogin({
              uid: userDataWithName.uid,
              email: userDataWithName.email,
              name: userDataWithName.displayName,
            })
          );
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
    // setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col-reverse lg:flex-row">
      <AuthHero
        text={"Already have an account?"}
        buttonTxt={"Login"}
      ></AuthHero>
      <div className="lg:absolute top-0 right-0 z-50 bg-white w-full lg:w-1/2 h-auto lg:h-screen flex flex-col items-center lg:items-start justify-center px-8 lg:px-24 py-16 rounded-bl-3xl rounded-br-3xl lg:rounded-tl-3xl lg:rounded-bl-3xl">
        <Logo></Logo>

        <h3 className="font-bold text-black z-10 text-xl mt-8">Welcome</h3>

        <p className="text-neutral-400 mt-1 mb-4">
          Register to create an account
        </p>

        <form onSubmit={handleSubmit(signup)}>
          <FormInput
            label={"NAME"}
            placeholder={"John Cena"}
            type={"text"}
            style={"mt-4"}
            {...register("name", { required: true })}
          ></FormInput>
          <FormInput
            label={"ADDRESS"}
            placeholder={"MP, India"}
            type={"text"}
            style={"mt-4"}
            {...register("address", { required: true })}
          ></FormInput>
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

          <p className="text-red-500 mt-2">{error}</p>

          <Button type="submit" style={"lg:w-96 w-fit mt-8"}>
            Create an account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
