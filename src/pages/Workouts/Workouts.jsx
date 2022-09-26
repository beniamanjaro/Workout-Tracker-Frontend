import React, { useEffect, useState, useContext } from "react";
import WorkoutPlanFormStep2 from "../../components/Workout/WorkoutPlanFormStep2";
import WorkoutCard from "../../components/Workout/WorkoutPlanCard";
import WorkoutPlanFormStep1 from "../../components/Workout/WorkoutPlanFormStep1";
import { AuthContext } from "../../context/AuthContext";
import exercisesService from "../../services/exercises";
import userService from "../../services/users";

const Workouts = () => {
  const [userDetails, setUserDetails] = useState({});
  const [exercises, setExercises] = useState([]);
  const [step, setStep] = useState(1);
  const [createWorkoutFormActive, setCreateWorkoutFormActive] = useState(false);
  const {
    user: { userId, token },
  } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    userId: userId,
    name: "",
    timesPerWeek: 0,
    routines: [],
  });

  const options = exercises?.map((e) => {
    return {
      value: e.id,
      label: e.name,
    };
  });

  useEffect(() => {
    const handleGetUserById = async () => {
      const data = await userService.getUserById(userId, token);
      setUserDetails(data);
    };
    const handleGetExercisesNames = async () => {
      const data = await exercisesService.getExercisesNames(token);
      setExercises(data);
    };
    handleGetExercisesNames();
    handleGetUserById();
  }, [userId, token]);

  const getCurrentStepForm = () => {
    switch (step) {
      case 1:
        return (
          <WorkoutPlanFormStep1
            setCreateWorkoutFormActive={setCreateWorkoutFormActive}
            setStep={setStep}
            step={step}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <WorkoutPlanFormStep2
            setCreateWorkoutFormActive={setCreateWorkoutFormActive}
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
            options={options}
            step={step}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            token={token}
            timesPerWeek={formData.timesPerWeek}
          />
        );

      default:
        return "";
    }
  };

  return (
    <div className=" flex flex-col gap-2 justify-center items-center mt-24 w-full">
      <button
        onClick={() => setCreateWorkoutFormActive(true)}
        class="bg-white hover:bg-gray-100 active:scale-95 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Create New WorkoutPlan
      </button>
      {createWorkoutFormActive && (
        <div className="overflow-y-auto fixed w-screen bg-white top-0 h-screen left-0 lg:left-28">
          {getCurrentStepForm()}
        </div>
      )}
      {userDetails?.workoutPlans?.map((wp) =>
        wp.id === userDetails.selectedWorkoutPlanId ? (
          <WorkoutCard
            name={wp.name}
            selectedWorkoutPlanId={userDetails.selectedWorkoutPlanId}
            workoutPlanId={wp.id}
            timesPerWeek={wp.timesPerWeek}
          />
        ) : (
          <></>
        )
      )}
      {userDetails?.workoutPlans?.map((wp) =>
        wp.id !== userDetails.selectedWorkoutPlanId ? (
          <WorkoutCard
            name={wp.name}
            selectedWorkoutPlanId={userDetails.selectedWorkoutPlanId}
            timesPerWeek={wp.timesPerWeek}
            workoutPlanId={wp.id}
          />
        ) : (
          <></>
        )
      )}
    </div>
  );
};

export default Workouts;
