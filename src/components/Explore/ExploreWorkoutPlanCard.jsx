import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const ExploreWorkoutPlanCard = ({ workoutPlan }) => {
  return (
    <div className="w-full hover:-translate-y-1 p-2 ease-in duration-150">
      <Link to={`/workouts/${workoutPlan.id} `}>
        <div className="bg-white p-6 w-full border-b-4 border-b-yellow-400 cursor-pointer group flex justify-between rounded-lg shadow-lg">
          <div className="">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              {workoutPlan.name}
            </h2>
            <p className="text-gray-700">
              times per week {workoutPlan.timesPerWeek}
            </p>
            <p className="text-gray-700">
              followers: {workoutPlan.users.length}
            </p>
          </div>
          <button className="border border-black flex justify-between items-center">
            <p className="p-2 group-hover:underline text-l">View</p>
            <div className="pl-4 pr-4 group-hover:translate-x-1 ease-in duration-150">
              <BsArrowRight />
            </div>
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ExploreWorkoutPlanCard;
