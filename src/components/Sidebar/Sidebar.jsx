import React from "react";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineCalendar,
  AiOutlineHeart,
} from "react-icons/ai";
import orkLogo from "../../orklogowhite.png";
import { BiDumbbell } from "react-icons/bi";
import { GiGymBag } from "react-icons/gi";
import { BsGraphUp } from "react-icons/bs";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sticky h-screen top-0 z-50">
      <div className="hidden lg:flex md:flex-col md:justify-between md:h-screen md:w-28 md:bg-[#06202A] md:border-r-2 md:border-black">
        <Link to="/">
          {/* <div className="pb-4 font-extralight bg-black text-white text-center self underline text-3xl">
            OrkOut
          </div> */}
          <img src={orkLogo} alt="ork logo" className="text-white" />
        </Link>
        <div>
          <div className="flex flex-col">
            <Link
              to="/workouts"
              className="flex border-t-2 border-b-2 gap-2 items-center"
            >
              <GiGymBag className="text-white w-8 h-8 pl-2" />
              <div className=" mx-auto pt-4 pb-4 w-full text-white text-left cursor-pointer transition ease-in hover:text-pink-700 ">
                Workouts
              </div>
            </Link>
            <Link to="/history" className="flex border-b-2 items-center gap-2">
              <AiOutlineCalendar className="text-white w-8 h-8 pl-2" />
              <div
                className=" mx-auto pt-4 pb-4 w-full text-white text-left cursor-pointer
            transition ease-in hover:text-pink-700"
              >
                History
              </div>
            </Link>
            <Link to="/" className="flex border-b-2 items-center gap-2">
              <BsGraphUp className="text-white w-8 h-8 pl-2" />
              <div
                className=" mx-auto pt-4 pb-4 w-full text-white text-left cursor-pointer
            transition ease-in hover:text-pink-700"
              >
                Progress
              </div>
            </Link>
            <Link
              to="/exercises"
              className="flex border-b-2 items-center gap-2"
            >
              <BiDumbbell className="text-white w-8 h-8 pl-2" />
              <div className=" mx-auto pt-4 pb-4 w-full text-white text-left cursor-pointer transition ease-in hover:text-pink-700 ">
                Exercises
              </div>
            </Link>
            <Link to="/" className="flex border-b-2 items-center gap-2">
              <AiOutlineCalendar className="text-white w-8 h-8 pl-2" />
              <div className=" mx-auto pt-4 pb-4 w-full text-left cursor-pointer transition ease-in text-pink-700 ">
                Extra
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-white text-center">Made With</div>
          <AiOutlineHeart className="text-red-500 text-center" />
          <div className="text-white text-center">By</div>
          <div className="flex mb-8 justify-center items-center">
            <div className="cursor-pointer animate-bounce hover:animate-none">
              <a
                target="_blank"
                href="https://www.linkedin.com/in/beniamin-vrajitor-0b3378170/"
                rel="noreferrer"
              >
                <AiFillLinkedin className="text-white w-10 h-10" />
              </a>
            </div>
            <div className="text-pink-700 cursor-default m-2">&</div>
            <div className="cursor-pointer animate-rubberBandInf hover:animate-none">
              <a
                target="_blank"
                href="https://github.com/beniamanjaro"
                rel="noreferrer"
              >
                <AiFillGithub className="text-white w-10 h-10" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
