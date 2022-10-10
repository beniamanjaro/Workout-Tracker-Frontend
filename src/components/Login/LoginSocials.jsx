import { useState, useEffect, useContext } from "react";
import { AiFillFacebook, AiOutlineGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../../context/actionTypes";
import { AuthContext } from "../../context/AuthContext";
import loginService from "../../services/login";

const LoginSocials = () => {
  const [disabled, setDisabled] = useState(false);
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const navigator = useNavigate();

  const handleCallbackResponse = async (response) => {
    let obj = jwt_decode(response.credential);
    const user = await loginService.loginGoogle({
      Email: obj.email,
      IdToken: response.credential,
    });
    dispatch({ type: LOGIN_REQUEST });
    try {
      dispatch({ type: LOGIN_SUCCESS, payload: user });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error });
    }
    navigator("/workouts");
  };

  const handleGoogleLogin = () => {
    setDisabled(true);
    try {
      window.google.accounts.id.initialize({
        client_id:
          "1016888836885-s5dkinjt60rn61ds6j7rt7nvf3ehifeo.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });

      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          throw new Error("Try to clear the cookies or try again later!");
        }
        if (
          notification.isSkippedMoment() ||
          notification.isDismissedMoment()
        ) {
          setDisabled(false);
        }
      });
    } catch (err) {}
  };

  return (
    <div className="flex flex-1 lg:flex-col items-center">
      <button type="submit">
        <Link to="/login" className="relative inline-block text-lg group">
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-black transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-pink-500"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
            <span className="relative flex items-center gap-2">
              Github
              <AiOutlineGithub />
            </span>
          </span>
          <span
            className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
            data-rounded="rounded-lg"
          ></span>
        </Link>
      </button>

      <button type="submit">
        <Link to="/register" className="relative inline-block text-lg group">
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-black transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-pink-500"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
            <span className="relative flex items-center gap-2">
              Facebook
              <AiFillFacebook />
            </span>
          </span>
          <span
            className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
            data-rounded="rounded-lg"
          ></span>
        </Link>
      </button>
      <button type="submit">
        <Link
          to=""
          onClick={handleGoogleLogin}
          className="relative inline-block text-lg group"
        >
          <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-black transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
            <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-pink-500"></span>
            <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
            <span className="relative flex items-center gap-2">
              Google
              <FcGoogle />
            </span>
          </span>
          <span
            className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
            data-rounded="rounded-lg"
          ></span>
        </Link>
      </button>
    </div>
  );
};

export default LoginSocials;
