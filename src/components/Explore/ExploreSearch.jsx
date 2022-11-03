import React, { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import workoutPlansService from "../../services/workoutPlans";

const ExploreSearch = ({ setWorkoutPlans }) => {
  const [searchValue, setSearchValue] = useSearchParams();
  const [search, setSearch] = useState();

  const {
    user: { token },
  } = useContext(AuthContext);

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearch(e.target.value);
    if (text.length === 0) {
      searchValue.delete("query");
      setSearchValue(searchValue, {
        replace: true,
      });
    } else {
      searchValue.set("query", text);
      setSearchValue(searchValue, {
        replace: true,
      });
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const sortBy = searchValue.get("sortBy") || "";
    const timesPerWeek = searchValue.get("timesPerWeek") || "";
    const query = searchValue.get("query") || search;

    const data = await workoutPlansService.getWorkoutPlansBySearch(
      query,
      sortBy,
      1,
      20,
      timesPerWeek,
      token
    );
    setWorkoutPlans(data.data);
  };

  return (
    <div>
      <h1 className="text-3xl text-center">Awesome Workout Plans</h1>
      <form onSubmit={handleSearchSubmit}>
        <div className="flex justify-center items-center mt-12 mb-12">
          <input
            className="shadow appearance-none max-w-[30vw] border-black border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            value={searchValue.get("query") || ""}
            placeholder="Search"
            onChange={handleSearchChange}
          />
          <button className="bg-red-500 hover:bg-white text-white hover:text-red-500 font-semibold py-2 px-4 border border-black rounded shadow duration-300">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExploreSearch;
