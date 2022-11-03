import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../../context/actionTypes";
import { AuthContext } from "../../context/AuthContext";
import loginService from "../../services/login";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const RegisterForm = ({ googleEmail }) => {
  const formSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    username: Yup.string().required(),
    password: Yup.string()
      .required("Password is mandatory")
      .min(5, "Password must be at least 5 characters long"),
    confirmPassword: Yup.string()
      .required("Password is mandatory")
      .oneOf([Yup.ref("password")], "Passwords do not match"),
  });

  const navigator = useNavigate();

  const formOptions = { resolver: yupResolver(formSchema), mode: "onChange" };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(formOptions);

  const { dispatch } = useContext(AuthContext);

  const login = async (email, password) => {
    const user = await loginService.login({
      email,
      password,
    });
    dispatch({ type: LOGIN_REQUEST });
    try {
      dispatch({ type: LOGIN_SUCCESS, payload: user });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error });
    }
    navigator("/workouts");
  };

  const onSubmit = async (data) => {
    if (data.password === data.confirmPassword) {
      await loginService.register({
        email: data.email,
        username: data.username,
        password: data.password,
      });
    }
    await login(data.email, data.password);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          defaultValue={googleEmail}
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
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className={
            errors.username
              ? "shadow appearance-none border-2 border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              : "shadow appearance-none border-black border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          }
          id="username"
          {...register("username")}
          type="text"
          placeholder="Username"
        />
        {errors.username?.type === "required" && (
          <p className="text-red-500 text-xs italic">Username is required</p>
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
            errors.password || errors.confirmPassword?.type === "oneOf"
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
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          className={
            errors.confirmPassword
              ? "shadow appearance-none border-2 border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              : "shadow appearance-none border-black border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          }
          id="confirmPassword"
          {...register("confirmPassword")}
          type="password"
          placeholder="******************"
        />
        {errors.confirmPassword?.type === "required" && (
          <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p>
        )}
        {errors.confirmPassword?.type === "oneOf" && (
          <p className="text-red-500 text-xs italic">
            Passwords should be the same.
          </p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign Up
        </button>
      </div>
      <p className="mt-4">
        Already Have an account? <br />{" "}
        <Link to={"/login"} className="text-blue-800">
          Sign In
        </Link>
        !
      </p>
    </form>
  );
};

export default RegisterForm;
