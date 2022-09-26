import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";

const CategoriesSlider = ({
  categories,
  category,
  setCategory,
  setExercises,
  token,
  setSearchValue,
  setPageNumber,
}) => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setTimeout(() => {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }, 500);
  }, []);

  return (
    <div className="mb-8">
      <motion.div
        ref={carousel}
        className="cursor-grab overflow-hidden w-[80vw] lg:w-[50vw]"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex w-full gap-4"
        >
          {categories.map((c) => (
            <CategoryCard
              bodyPart={c}
              category={category}
              setCategory={setCategory}
              token={token}
              setExercises={setExercises}
              setSearchValue={setSearchValue}
              setPageNumber={setPageNumber}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CategoriesSlider;
