import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import RoutineCard from "../../components/Routine/RoutineCard";
import { AuthContext } from "../../context/AuthContext";
import workoutPlanService from "../../services/workoutPlans";
import exercisesService from "../../services/exercises";
import WorkoutPlanUpdateFormStep1 from "../../components/Workout/WorkoutPlanUpdateFormStep1";
import WorkoutPlanUpdateFormStep2 from "../../components/Workout/WorkoutPlanUpdateFormStep2";
import CompletedRoutineForm from "../../components/CompletedRoutine/CompletedRoutineForm";

const Workout = () => {
  const [workoutPlanDetails, setWorkoutPlanDetails] = useState({});
  const [exercisesNames, setExercisesNames] = useState([]);
  const [routineData, setRoutineData] = useState({});
  const [completeRoutineActive, setCompleteRoutineActive] = useState(false);
  const [step, setStep] = useState(1);
  const [createWorkoutFormActive, setCreateWorkoutFormActive] = useState(false);
  const {
    user: { token },
  } = useContext(AuthContext);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    userId: workoutPlanDetails.userId,
    name: "",
    timesPerWeek: 0,
    routines: "",
  });

  const options = exercisesNames?.map((e) => {
    return {
      value: e.id,
      label: e.name,
    };
  });

  const routinesForForm = workoutPlanDetails.routines?.map((routine) => {
    var obj = [];

    routine.workoutSets
      .flatMap((ws) => ws.sets)
      .flatMap((s) => s)
      .forEach((a) => {
        var b = obj.find((b) => b?.name === a.exercise?.id);
        if (!b) {
          obj.push({
            name: a.exercise?.id,
            sets: 1,
          });
        } else {
          b.sets++;
        }
      });
    return {
      dayOrderNumber: routine.dayOrderNumber,
      name: routine.name,
      exercises: obj,
    };
  });

  const getCurrentStepForm = () => {
    switch (step) {
      case 1:
        return (
          <WorkoutPlanUpdateFormStep1
            setCreateWorkoutFormActive={setCreateWorkoutFormActive}
            setStep={setStep}
            step={step}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <WorkoutPlanUpdateFormStep2
            setWorkoutPlanDetails={setWorkoutPlanDetails}
            setCreateWorkoutFormActive={setCreateWorkoutFormActive}
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
            options={options}
            step={step}
            id={id}
            timesPerWeek={formData.timesPerWeek}
          />
        );

      default:
        return "";
    }
  };

  const handleShowForm = () => {
    setCreateWorkoutFormActive(true);
    setFormData({
      userId: workoutPlanDetails.userId,
      name: workoutPlanDetails.name,
      timesPerWeek: workoutPlanDetails.timesPerWeek,
      routines: routinesForForm,
    });
  };

  useEffect(() => {
    const getWorkoutPlanDetailsById = async () => {
      const data = await workoutPlanService.getWorkoutPlanById(id, token);
      setWorkoutPlanDetails(data);
    };
    const handleGetExercisesNames = async () => {
      const data = await exercisesService.getExercisesNames(token);
      setExercisesNames(data);
    };
    handleGetExercisesNames();
    getWorkoutPlanDetailsById();
  }, []);
  return (
    <div>
      <div className="text-center text-3xl">{workoutPlanDetails.name}</div>
      <button onClick={handleShowForm}>UPDATE WORKOUT</button>
      {createWorkoutFormActive && (
        <div className="overflow-y-auto fixed w-screen bg-white top-0 h-screen left-0 lg:left-28">
          {getCurrentStepForm()}
        </div>
      )}
      <div className="m-4 grid p-4 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 md:gap-8 md:ml-12 md:mr-12">
        {workoutPlanDetails.routines?.map((r) => {
          console.log(r);

          return (
            <div className="flex flex-col">
              <RoutineCard
                name={r.name}
                dayOrder={r.dayOrderNumber}
                workoutSets={r.name}
                exercises={r.workoutSets
                  ?.flatMap((ws) => ws.sets)
                  .flatMap((s) => s)}
              />
              <button
                onClick={() => {
                  console.log("routine r", r);
                  setCompleteRoutineActive(true);
                  setRoutineData(r);
                }}
                className="bg-white border border-black"
              >
                Complete Routine
              </button>
            </div>
          );
        })}
        {completeRoutineActive && (
          <div className="overflow-y-auto fixed w-screen bg-white top-0 h-screen left-0 lg:left-28">
            <CompletedRoutineForm
              setCompleteRoutineActive={setCompleteRoutineActive}
              routineData={routineData}
              exercises={routineData.workoutSets
                ?.flatMap((ws) => ws.sets)
                .flatMap((s) => s)}
              id={id}
              token={token}
              setWorkoutPlanData={setWorkoutPlanDetails}
              workoutPlanData={workoutPlanDetails}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Workout;
