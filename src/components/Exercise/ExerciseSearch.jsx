import React, { useState } from "react";
import exercisesService from "../../services/exercises";

const ExerciseSearch = ({
  setSearchValue,
  setExercises,
  token,
  setCategory,
  setPageNumber,
}) => {
  const [value, setValue] = useState("");

  const handleSearchInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setPageNumber(1);
    if (value) {
      const res = await exercisesService.getExercisesByName(token, value, 1);
      setCategory("all");
      setExercises(res.data);
      setSearchValue(value);
      setValue("");
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center">
        Awesome Exercises You <br /> Should Know about
      </h1>
      <form onSubmit={handleSearchSubmit}>
        <div className="flex justify-center items-center mt-12 mb-12">
          <input
            className="shadow appearance-none border-black border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            value={value}
            placeholder="Search"
            onChange={handleSearchInputChange}
          />
          <button class="bg-red-500 hover:bg-white text-white hover:text-red-500 font-semibold py-2 px-4 border border-black rounded shadow duration-300">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExerciseSearch;
