import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const Card = ({ name, selectedWorkoutPlanId, workoutPlanId, timesPerWeek }) => {
  return (
    <>
      {selectedWorkoutPlanId === workoutPlanId ? (
        <div className="w-full hover:-translate-y-1 ease-in duration-150">
          <Link to={`/workouts/${workoutPlanId} `}>
            <p className="text-xl">Selected Workout Plan</p>
            <div className="bg-white p-6 w-full border-b-4 border-b-yellow-400 cursor-pointer group flex justify-between rounded-lg shadow-lg">
              <div className="">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  {name}
                </h2>
                <p className="text-gray-700">times per week {timesPerWeek}</p>
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
      ) : (
        <div className="w-full hover:-translate-y-1 ease-in duration-150">
          <Link to={`/workouts/${workoutPlanId}`}>
            <div className="bg-white p-6 w-full border-b-4 border-b-black cursor-pointer group flex justify-between rounded-lg shadow-lg">
              <div className="">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                  {name}
                </h2>
                <p className="text-gray-700">times per week {timesPerWeek}</p>
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
      )}
    </>
  );
};

export default Card;
