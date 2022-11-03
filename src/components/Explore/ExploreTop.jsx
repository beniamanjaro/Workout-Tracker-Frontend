import React from "react";
import ExploreFilters from "./ExploreFilters";
import ExploreSearch from "./ExploreSearch";
import ExploreSortSelect from "./ExploreSortSelect";

const ExploreTop = ({ setWorkoutPlans }) => {
  return (
    <div>
      <ExploreSearch setWorkoutPlans={setWorkoutPlans} />
      <h4 className="text-3xl ml-8">Filters</h4>
      <div className="flex justify-between mr-8 ml-8">
        <ExploreFilters setWorkoutPlans={setWorkoutPlans} />
        <ExploreSortSelect setWorkoutPlans={setWorkoutPlans} />
      </div>
    </div>
  );
};

export default ExploreTop;
