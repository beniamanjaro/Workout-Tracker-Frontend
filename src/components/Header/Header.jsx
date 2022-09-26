import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="lg:flex justify-between w-full hidden bg-[#E7DF9F]">
      <Link to="/" className="xl:ml-64">
        <div className="pt-4 pl-4 pr-4 pb-4 font-extralight bg-black text-white text-center self underline text-3xl">
          OrkOut
        </div>
      </Link>
      <div className="flex gap-24 xl:mr-64 pt-4 items-center">
        <div className="text-2xl hover:underline cursor-pointer">Home</div>
        <div className="text-2xl hover:underline cursor-pointer">
          Lose Weigth
        </div>
        <Link to="/login">
          <div className="text-2xl border-[1px] border-black p-2 pl-4 pr-4 cursor-pointer hover:rounded-lg ease-in duration-150 ">
            Ork In
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
