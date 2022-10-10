import { Link } from "react-router-dom";

const ExerciseCard = ({ exercise }) => {
  return (
    <Link
      className="hover:scale-105 duration-200 ease-in"
      to={`/exercises/${exercise?.id}`}
    >
      <img
        className="border-t-4 border border-black border-t-red-500"
        src={exercise?.gifLink}
        alt={exercise?.name}
        loading="lazy"
      />
      <div>
        <button className="hover:shadow-lg border border-black bg-red-500 text-white capitalize rounded-xl m-2 p-1">
          {exercise?.category}
        </button>
        <button className="hover:shadow-lg border border-black bg-yellow-700 text-white capitalize rounded-xl m-2 p-1">
          {exercise?.muscle}
        </button>
      </div>
      <p className="text-xl ml-2 capitalize">{exercise?.name}</p>
    </Link>
  );
};

export default ExerciseCard;
