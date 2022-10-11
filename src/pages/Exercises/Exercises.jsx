import { useContext, useState } from "react";
import { useEffect } from "react";
import ExerciseCard from "../../components/Exercise/ExerciseCard";
import { AuthContext } from "../../context/AuthContext";
import exercisesService from "../../services/exercises";
import InfiniteScroll from "react-infinite-scroll-component";
import ExerciseSearch from "../../components/Exercise/ExerciseSearch";
import CategoriesSlider from "../../components/Exercise/CategoriesSlider";
import SpinningLoader from "../../components/SpinningLoader";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const {
    user: { token },
  } = useContext(AuthContext);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const getExercises = async () => {
      const res = await exercisesService.getAllExercises(token, pageNumber);
      setExercises(res.data);
    };
    const getCategories = async () => {
      const res = await exercisesService.getExercisesCategories(token);
      setCategories(["all", ...res]);
    };
    getCategories();
    getExercises();
  }, []);

  //Fetches the next 40 exercises
  const fetchMoreExercises = async () => {
    if (!searchValue && category === "all") {
      setPageNumber(pageNumber + 1);
      const res = await exercisesService.getAllExercises(token, pageNumber);
      setExercises(exercises.concat(res.data));
    }
    if (category !== "all") {
      setPageNumber(pageNumber + 1);
      const res = await exercisesService.getExercisesByCategory(
        token,
        category,
        pageNumber + 1
      );
      setExercises(exercises.concat(res.data));
    }
    if (searchValue) {
      setPageNumber(pageNumber + 1);
      const res = await exercisesService.getExercisesByName(
        token,
        searchValue,
        pageNumber + 1
      );
      setExercises(exercises.concat(res.data));
    }
  };

  return (
    <>
      <ExerciseSearch
        setExercises={setExercises}
        setSearchValue={setSearchValue}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        setCategory={setCategory}
        token={token}
      />
      <CategoriesSlider
        categories={categories}
        setCategories={setCategories}
        category={category}
        setCategory={setCategory}
        setExercises={setExercises}
        setSearchValue={setSearchValue}
        setPageNumber={setPageNumber}
        token={token}
      />
      <InfiniteScroll
        dataLength={exercises.length}
        next={fetchMoreExercises}
        hasMore={true}
        loader={
          <div className="absolute left-[50%]">
            <SpinningLoader />
          </div>
        }
      >
        <div className="grid p-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 md:ml-12 md:mr-12">
          {exercises?.map((e) => (
            <ExerciseCard exercise={e} key={e.id} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Exercises;
