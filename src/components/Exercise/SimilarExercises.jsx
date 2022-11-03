import ExerciseCard from "./ExerciseCard";

const SimilarExercises = ({ similarExercises }) => {
  return (
    <div>
      <h3 className="text-3xl ml-12 mb-12 mt-8">Similar Exercises:</h3>
      <div className="flex gap-4 mr-4 ml-4">
        {similarExercises?.map((e) => (
          <ExerciseCard exercise={e} />
        ))}
      </div>
    </div>
  );
};

export default SimilarExercises;
