import { useEffect, useState, useContext } from "react";
import WorkoutPlanFormStep2 from "../../components/Workout/WorkoutPlanFormStep2";
import WorkoutCard from "../../components/Workout/WorkoutPlanCard";
import WorkoutPlanFormStep1 from "../../components/Workout/WorkoutPlanFormStep1";
import { AuthContext } from "../../context/AuthContext";
import exercisesService from "../../services/exercises";
import userService from "../../services/users";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import SpinningLoader from "../../components/SpinningLoader";
import { toast } from "react-toastify";
import { WorkoutPlansContext } from "../../context/WorkoutPlansContext";
import {
  WORKOUT_PLANS_FAIL,
  WORKOUT_PLANS_REQUEST,
  WORKOUT_PLANS_SUCCESS,
} from "../../context/actionTypes";

const Workouts = () => {
  const [userDetails, setUserDetails] = useState({});
  const [exercises, setExercises] = useState([]);
  const [step, setStep] = useState(1);
  const [createWorkoutFormActive, setCreateWorkoutFormActive] = useState(false);
  const {
    user: { userId, token },
  } = useContext(AuthContext);

  const { workoutPlans, dispatch, loading } = useContext(WorkoutPlansContext);
  const [formData, setFormData] = useState({
    userId: userId,
    name: "",
    timesPerWeek: 0,
    routines: [],
  });

  const notifyError = (msg) => {
    toast.error(`${msg}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const options = exercises?.map((e) => {
    return {
      value: e.id,
      label: e.name,
    };
  });

  useEffect(() => {
    const handleGetUserById = async () => {
      try {
        const data = await userService.getUserById(userId, token);
        dispatch({ type: WORKOUT_PLANS_REQUEST });
        try {
          dispatch({
            type: WORKOUT_PLANS_SUCCESS,
            payload: data.workoutPlans,
          });
        } catch (error) {
          dispatch({ type: WORKOUT_PLANS_FAIL, payload: error });
        }
        setUserDetails(data);
      } catch (err) {
        notifyError(err.message);
      }
    };
    const handleGetExercisesNames = async () => {
      const data = await exercisesService.getExercisesNames(token);
      setExercises(data);
    };
    handleGetUserById();
    handleGetExercisesNames();
  }, [userId, token, dispatch]);

  console.log(workoutPlans);

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
            timesPerWeek={formData.timesPerWeek}
          />
        );

      default:
        return "";
    }
  };

  return (
    <>
      {loading === true ? (
        <SpinningLoader />
      ) : (
        <div className=" flex flex-col gap-2 justify-center items-center mt-24 w-full">
          <button
            onClick={() => setCreateWorkoutFormActive(true)}
            className="bg-white hover:bg-gray-100 active:scale-95 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Create New WorkoutPlan
          </button>
          <Link to={"/workouts/explore"}>
            <div className="flex justify-center gap-1 items-center bg-white hover:bg-gray-100 active:scale-95 py-2 px-4 border border-gray-400 rounded shadow">
              <AiOutlineSearch />
              <button className="text-gray-800 font-semibold">Explore</button>
            </div>
          </Link>
          {createWorkoutFormActive && (
            <div className="overflow-y-auto fixed w-screen bg-white top-0 h-screen left-0 lg:left-28">
              {getCurrentStepForm()}
            </div>
          )}
          {workoutPlans?.map((wp) =>
            wp.id === userDetails.selectedWorkoutPlanId ? (
              <WorkoutCard
                key={wp.id}
                name={wp.name}
                selectedWorkoutPlanId={userDetails.selectedWorkoutPlanId}
                workoutPlanId={wp.id}
                timesPerWeek={wp.timesPerWeek}
              />
            ) : (
              ""
            )
          )}
          {workoutPlans
            ?.filter((wp) => wp.userId === userId)
            .map((wp) =>
              wp.id !== userDetails.selectedWorkoutPlanId ? (
                <WorkoutCard
                  key={wp.id}
                  name={wp.name}
                  selectedWorkoutPlanId={userDetails.selectedWorkoutPlanId}
                  timesPerWeek={wp.timesPerWeek}
                  workoutPlanId={wp.id}
                />
              ) : (
                ""
              )
            )}
          Subscribed To
          {workoutPlans
            ?.filter((wp) => wp.userId !== userId)
            .map((wp) => (
              <WorkoutCard
                key={wp.id}
                name={wp.name}
                selectedWorkoutPlanId={userDetails.selectedWorkoutPlanId}
                timesPerWeek={wp.timesPerWeek}
                workoutPlanId={wp.id}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default Workouts;
