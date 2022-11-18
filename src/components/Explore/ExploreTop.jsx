import React from "react";
import ExploreFilters from "./ExploreFilters";
import ExploreSearch from "./ExploreSearch";
import ExploreSortSelect from "./ExploreSortSelect";

const ExploreTop = ({ setWorkoutPlans }) => {
  return (
    <>
      <ExploreSearch setWorkoutPlans={setWorkoutPlans} />
      <h4 className="text-3xl ml-8 hidden sm:block">Filters</h4>
      <div className="flex justify-between mr-8 ml-8 gap-2 sticky top-0">
        <ExploreFilters setWorkoutPlans={setWorkoutPlans} />
        <ExploreSortSelect setWorkoutPlans={setWorkoutPlans} />
      </div>
    </>
  );
};

export default ExploreTop;
