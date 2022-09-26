import React from "react";
import RegisterForm from "../../components/Register/RegisterForm";
import RegisterSocials from "../../components/Register/RegisterSocials";

const Register = () => {
  return (
    <div className="bg-[#E7DF9F] flex justify-center items-center h-screen lg:h-[calc(100vh-68px)]">
      <div className="flex lg:flex-row flex-col items-center w-[60%] h-[90%]">
        <div className="flex flex-1 flex-col">
          <RegisterForm />
        </div>
        <div className="relative flex-none flex items-center justify-center w-full lg:w-[30%] h-[15%] lg:h-full">
          <div className="absolute h-[0.1px] w-[70%] lg:h-[70%] lg:w-[0.1px] top-0 left-0 bottom-0 right-0 z-10 m-auto bg-black"></div>
          <div className="border-2 border-pink-700 p-2 font-bold bg-white text-black rounded-full z-50">
            OR
          </div>
        </div>
        <div className="flex-1 flex">
          <RegisterSocials />
        </div>
      </div>
    </div>
  );
};

export default Register;
