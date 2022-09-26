import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LOGIN_LOGOUT } from "../../context/actionTypes";
import { AuthContext } from "../../context/AuthContext";

const SignedInHeader = () => {
  const { dispatch } = useContext(AuthContext);

  const signOut = () => {
    dispatch({ type: LOGIN_LOGOUT });
    localStorage.removeItem("user");
  };

  return (
    <div className="lg:flex justify-end w-full hidden bg-[#E7DF9F]">
      <div className="flex p-2">
        <Link to="/login">
          <button
            onClick={signOut}
            className="text-2xl border-[1px] border-black p-2 pl-4 pr-4 cursor-pointer hover:rounded-lg ease-in duration-150 "
          >
            Ork Out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SignedInHeader;
