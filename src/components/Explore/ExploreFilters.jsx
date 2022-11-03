import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import { AuthContext } from "../../context/AuthContext";
import workoutPlansService from "../../services/workoutPlans";

const ExploreFilters = ({ setWorkoutPlans }) => {
  const [searchValue, setSearchValue] = useSearchParams();
  const {
    user: { token },
  } = useContext(AuthContext);

  const selectOptions = [
    {
      label: `1`,
      value: 1,
    },
    {
      label: `2`,
      value: 2,
    },
    {
      label: `3`,
      value: 3,
    },
    {
      label: `4`,
      value: 4,
    },
    {
      label: `5`,
      value: 5,
    },
    {
      label: `6`,
      value: 6,
    },
    {
      label: `7`,
      value: 7,
    },
    {
      label: `all`,
      value: null,
    },
  ];

  const handleChangeSelectTimesPerWeek = async (e) => {
    const sortBy = searchValue.get("sortBy") || "";
    const query = searchValue.get("query") || "";

    searchValue.set("timesPerWeek", e.value);
    setSearchValue(searchValue, {
      replace: true,
    });

    const data = await workoutPlansService.getWorkoutPlansBySearch(
      query,
      sortBy,
      1,
      20,
      e.value,
      token
    );
    setWorkoutPlans(data.data);
  };

  return (
    <div className="flex-col justify-center items-center">
      <div className="flex justify-center items-center">
        <p>times per week: &nbsp;</p>
        <Select
          options={selectOptions}
          onChange={handleChangeSelectTimesPerWeek}
          placeholder={searchValue.get("timesPerWeek") || "Select"}
        />
      </div>
    </div>
  );
};

export default ExploreFilters;
