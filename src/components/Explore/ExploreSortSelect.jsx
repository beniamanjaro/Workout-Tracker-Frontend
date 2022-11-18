import { useContext } from "react";
import { AiOutlineFilter } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import { AuthContext } from "../../context/AuthContext";
import workoutPlansService from "../../services/workoutPlans";

const ExploreSortSelect = ({ setWorkoutPlans }) => {
  const [searchValue, setSearchValue] = useSearchParams();
  const {
    user: { token },
  } = useContext(AuthContext);

  const selectOptions = [
    {
      label: `Popularity`,
      value: "Popularity",
    },
    {
      label: `Recent`,
      value: "Recent",
    },
  ];

  const handleChangeSelectOrderBy = async (e) => {
    const query = searchValue.get("query") || "";
    const timesPerWeek = searchValue.get("timesPerWeek") || "";

    searchValue.set("sortBy", e.value);
    setSearchValue(searchValue, {
      replace: true,
    });

    const data = await workoutPlansService.getWorkoutPlansBySearch(
      query,
      e.value,
      1,
      20,
      timesPerWeek,
      token
    );
    setWorkoutPlans(data.data);
  };

  return (
    <div className="flex-col justify-center items-center w-full">
      <div className="justify-center items-center hidden sm:flex">
        <p>Sort By: &nbsp;</p>
        <Select
          options={selectOptions}
          onChange={handleChangeSelectOrderBy}
          placeholder={searchValue.get("sortBy") || "Select"}
        />
      </div>
      <div className="flex sm:hidden justify-center items-center bg-white w-full h-12 border-2 border-black">
        <p className="text-xl">Filter</p>
        <AiOutlineFilter className="w-6 h-6" />
      </div>
    </div>
  );
};

export default ExploreSortSelect;
