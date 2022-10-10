import { Link } from "react-router-dom";
import orkLogo from "../../orc-icon-24.jpg";
import arrow from "../../Untitled2.png";

const Body = () => {
  return (
    <div className="flex flex-col lg:ml-48 md:mt-36">
      <div className="flex flex-col md:flex-row pb-24 items-center">
        <img className="w-64 h-64" src={orkLogo} alt="ork logo" />
        <div className="flex flex-col ml-4">
          <div className="text-3xl xl:text-6xl">Not Just A Workout Logger.</div>
          <div className="text-3xl xl:text-6xl md:ml-12 ml-4">
            Start Orking Out Now To Get In Shape.
          </div>
        </div>
      </div>
      <img
        className="w-64 h-64 absolute top-[25rem] left-0"
        src={arrow}
        alt="arrow"
      />
      <div className="flex">
        <div className="flex justify-end py-4 ml-4 -rotate-6">
          <button type="submit">
            <Link
              to="/register"
              className="relative inline-block text-lg group"
            >
              <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-black transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-pink-500"></span>
                <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                <span className="relative">Become An Ork</span>
              </span>
              <span
                className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                data-rounded="rounded-lg"
              ></span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Body;
