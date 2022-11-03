import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../../context/actionTypes";
import { AuthContext } from "../../context/AuthContext";
import loginService from "../../services/login";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const formSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required("Password is mandatory")
      .min(5, "Password must be at least 5 characters long"),
  });

  const navigator = useNavigate();

  const formOptions = { resolver: yupResolver(formSchema), mode: "onChange" };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(formOptions);

  const { dispatch } = useContext(AuthContext);

  const login = async (data) => {
    const user = await loginService.login({
      email: data.email,
      password: data.password,
    });
    dispatch({ type: LOGIN_REQUEST });
    try {
      dispatch({ type: LOGIN_SUCCESS, payload: user });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error });
    }
    navigator("/workouts");
  };

  return (
    <form
      onSubmit={handleSubmit(login)}
      className="bg-white max-w-[280px] shadow-md rounded px-8 pt-6 pb-8 mb-4 border-4 border-black"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className={
            errors.email
              ? "shadow appearance-none border-red-500 border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              : "shadow appearance-none border-black border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          }
          id="email"
          {...register("email")}
          type="text"
          placeholder="Email"
        />
        {errors.email?.type === "required" && (
          <p className="text-red-500 text-xs italic">Email is required</p>
        )}
        {errors.email?.type === "email" && (
          <p className="text-red-500 text-xs italic">
            Email is in wrong format
          </p>
        )}
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className={
            errors.password
              ? "shadow appearance-none border-2 border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              : "shadow appearance-none border-black border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          }
          id="password"
          {...register("password")}
          type="password"
          placeholder="******************"
        />
        {errors.password?.type === "required" && (
          <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p>
        )}
        {errors.password?.type === "min" && (
          <p className="text-red-500 text-xs italic">
            Password should be atleast 5 characters long.
          </p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </div>
      <p className="mt-4">
        You don't have an account yet?{" "}
        <Link to={"/register"} className="text-blue-800">
          Sign Up
        </Link>
        !
      </p>
    </form>
  );
};

export default LoginForm;
