import { useContext } from "react";
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
    <div className="flex justify-center items-center">
      <p>Sort By: &nbsp;</p>
      <Select
        options={selectOptions}
        onChange={handleChangeSelectOrderBy}
        placeholder={searchValue.get("sortBy") || "Select"}
      />
    </div>
  );
};

export default ExploreSortSelect;
