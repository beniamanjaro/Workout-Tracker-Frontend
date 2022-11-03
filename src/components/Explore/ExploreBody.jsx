import React from "react";
import ExploreWorkoutPlanCard from "./ExploreWorkoutPlanCard";

const ExploreBody = ({ workoutPlans }) => {
  return (
    <div className="lg:grid-cols-3 grid-cols-1 md:grid-cols-2 grid">
      {workoutPlans.map((wp) => (
        <ExploreWorkoutPlanCard workoutPlan={wp} />
      ))}
    </div>
  );
};

export default ExploreBody;
