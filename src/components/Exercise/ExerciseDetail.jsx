import { GiStrongMan, GiMuscleUp } from "react-icons/gi";
import { BiDumbbell } from "react-icons/bi";

const ExerciseDetail = ({ exerciseDetails }) => {
  const { category, equipment, gifLink, muscle, name } = exerciseDetails;

  return (
    <div className="flex flex-col md:flex-row justify-center items-center">
      <div className="flex-1 flex justify-center">
        <img
          className="w-full h-full md:max-w-[25vw] m-4 border border-t-4 border-t-red-500 border-black"
          src={gifLink}
          alt="exercise"
        />
      </div>
      <div className="flex-1 flex flex-col items-center">
        <h2 className="text-5xl mb-12 capitalize">{name}</h2>
        <p className="text-xl text-justify m-2 mb-8">
          Exercises keep you strong.{" "}
          <span className="underline decoration-pink-500 capitalize">
            {name}
          </span>{" "}
          is one of the best exercises to target your{" "}
          <span className="underline decoration-pink-500 capitalize">
            {muscle}
          </span>
          . It will help you improve your mood and gain energy.
        </p>
        <ul className="text-2xl w-full">
          <li className="flex justify-left items-center gap-4 m-2">
            <div className="bg-white rounded-full h-20 w-20 flex justify-center items-center">
              <GiMuscleUp className="w-full h-[80%]" />
            </div>
            <h4>{category}</h4>
          </li>
          <li className="flex justify-left items-center gap-4 m-2">
            <div className="bg-white rounded-full h-20 w-20 flex justify-center items-center">
              <GiStrongMan className="w-full h-[80%]" />
            </div>
            <h4>{muscle}</h4>
          </li>
          <li className="flex justify-left items-center gap-4 m-2">
            <div className="bg-white rounded-full h-20 w-20 flex justify-center items-center">
              <BiDumbbell className="w-full h-[80%]" />
            </div>
            <h4>{equipment}</h4>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ExerciseDetail;
