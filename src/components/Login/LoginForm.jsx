import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../../context/actionTypes";
import { AuthContext } from "../../context/AuthContext";
import loginService from "../../services/login";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, dispatch } = useContext(AuthContext);
  const navigator = useNavigate();
  console.log(user);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const login = async (e) => {
    e.preventDefault();
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
    setEmail("");
    setPassword("");
  };

  return (
    <form
      onSubmit={login}
      className="bg-white max-w-[280px] shadow-md rounded px-8 pt-6 pb-8 mb-4 border-4 border-black"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border-black border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          value={email}
          placeholder="Email"
          onChange={handleEmailChange}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border-2 border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          value={password}
          placeholder="******************"
          onChange={handlePasswordChange}
        />
        <p className="text-red-500 text-xs italic">Please choose a password.</p>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
