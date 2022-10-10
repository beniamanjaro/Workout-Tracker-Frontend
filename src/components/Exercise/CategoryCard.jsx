import { motion } from "framer-motion";
import { CgGym } from "react-icons/cg";
import exercisesService from "../../services/exercises";

const CategoryCard = ({
  bodyPart,
  category,
  setCategory,
  setExercises,
  token,
  setSearchValue,
  setPageNumber,
}) => {
  const handleCategoryChange = async () => {
    setCategory(bodyPart);
    const res = await exercisesService.getExercisesByCategory(
      token,
      bodyPart,
      1
    );
    setExercises(res.data);
    setPageNumber(1);
    setSearchValue("");
  };

  const handleAllCategory = async () => {
    setCategory(bodyPart);
    const res = await exercisesService.getAllExercises(token, 1);
    setExercises(res.data);
    setPageNumber(1);
    setSearchValue("");
  };

  return (
    <motion.div
      className={
        bodyPart === category
          ? "bg-white flex flex-col items-center p-4 shadow-lg whitespace-nowrap border-t-4 border-t-red-400"
          : "bg-white flex flex-col items-center p-4 shadow-lg whitespace-nowrap"
      }
    >
      <button
        onClick={bodyPart === "all" ? handleAllCategory : handleCategoryChange}
      >
        <CgGym className="text-red-400 w-24 h-24" />
        <p className="text-xl">{bodyPart}</p>
      </button>
    </motion.div>
  );
};

export default CategoryCard;
