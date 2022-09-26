import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import RoutineCard from "../../components/Routine/RoutineCard";
import { AuthContext } from "../../context/AuthContext";
import workoutPlanService from "../../services/workoutPlans";

const Workout = () => {
  const [workoutPlanDetails, setWorkoutPlanDetails] = useState({});
  const {
    user: { token },
  } = useContext(AuthContext);
  const id = useParams();
  const exercises = workoutPlanDetails.routines
    ?.flatMap((r) => r.workoutSets)
    .flatMap((ws) => ws.sets)
    .flatMap((s) => s.exercise);
  console.log(exercises);

  useEffect(() => {
    const getWorkoutPlanDetailsById = async () => {
      const data = await workoutPlanService.getWorkoutPlanById(id.id, token);
      setWorkoutPlanDetails(data);
    };
    getWorkoutPlanDetailsById();
  }, []);
  console.log(workoutPlanDetails);
  return (
    <div>
      <div className="text-center text-3xl">{workoutPlanDetails.name}</div>
      {workoutPlanDetails.routines?.map((r) => (
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg m-4">
          <RoutineCard
            name={r.name}
            dayOrder={r.dayOrderNumber}
            workoutSets={r.name}
            exercises={r.workoutSets
              ?.flatMap((ws) => ws.sets)
              .flatMap((s) => s.exercise)}
          />
        </div>
      ))}
    </div>
  );
};

export default Workout;
