import { useContext, useMemo, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import FieldArray from "./FieldArray";
import workoutPlansService from "../../services/workoutPlans";
import completeRoutineService from "../../services/completedRoutines";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { HamburgerMenuContext } from "../../context/HamburgerMenuContext";
import { ENABLE_HAMBURGER_MENU } from "../../context/actionTypes";
import { useEffect } from "react";

const CompletedRoutineForm = ({
  setCompleteRoutineActive,
  routineData,
  workoutPlanData,
  exercises,
  setRecentCompletedRoutines,
  recentCompletedRoutines,
  id,
  setWorkoutPlanData,
  visitingUserDetails,
}) => {
  const [exercisesStats, setExercisesStats] = useState(exercises);
  const {
    user: { userId, token },
  } = useContext(AuthContext);
  const { isHamburgerMenuVisible, dispatch } = useContext(HamburgerMenuContext);

  const validateSchema = Yup.object().shape({
    exercises: Yup.array().of(
      Yup.object().shape({
        weight: Yup.number().required().positive(),
        numberOfReps: Yup.number().required().positive().integer(),
      })
    ),
  });

  const formOptions = {
    resolver: yupResolver(validateSchema),
    mode: "onChange",
  };

  const {
    control,
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
    setValue,
  } = useForm(formOptions);

  const onSubmit = async (formData) => {
    console.log(formData);
    const formDataExercises = formData.exercises;

    const completedRoutineData =
      getCompletedRoutineDataFromExercises(formDataExercises);

    const addedCompletedRoutine = await handleCompleteRoutine({
      ...completedRoutineData,
      routineName: routineData.name,
    });
    setRecentCompletedRoutines([
      addedCompletedRoutine,
      ...recentCompletedRoutines,
    ]);
    if (!isHamburgerMenuVisible) {
      dispatch({ type: ENABLE_HAMBURGER_MENU });
    }
    notifySuccess();
    setCompleteRoutineActive(false);
  };

  const getCompletedRoutineDataFromExercises = (exercises) => {
    let totalVolume = 0;
    let totalReps = 0;
    const totalSets = exercises.length;
    const ex = exercises.map((e) => {
      totalVolume += e.weight * e.numberOfReps;
      totalReps += Number(e.numberOfReps);
      return {
        exerciseId: e.exercise.id,
        reps: e.numberOfReps,
        weight: e.weight,
      };
    });
    return {
      workoutPlanName: workoutPlanData.name,
      workoutPlanId: workoutPlanData.id,
      userId: visitingUserDetails.id,
      createdAt: new Date(),
      exercises: ex,
      totalVolume,
      totalReps,
      totalSets,
    };
  };

  const notifySuccess = () => {
    toast.success("Congratulations! Successfully completed the routine!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const notifyError = () => {
    toast.error("Please Complete All fields!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleClick = () => {
    if (errors.exercises) {
      notifyError();
      console.log(errors, "errors");
    }
  };

  const handleCloseForm = () => {
    dispatch({ type: ENABLE_HAMBURGER_MENU });
    setCompleteRoutineActive(false);
  };

  const handleCompleteRoutine = async (data) => {
    return await completeRoutineService.completeRoutine(data, token);
  };

  const handleAutoCompleteExercisesWithMostRecentStats = async () => {
    const getMostRecentExercisesStatsForRoutine = async () => {
      const data =
        await completeRoutineService.getMostRecentCompletedRoutineExercisesStatsByUserByWorkoutPlanByName(
          userId,
          workoutPlanData.id,
          routineData.name,
          token
        );
      setExercisesStats(data);
    };
    getMostRecentExercisesStatsForRoutine();
  };

  return (
    <div className="h-screen overflow-scroll bg-white fixed top-0 w-screen left-0 lg:left-28 flex flex-col items-center">
      <h1 className="text-center text-3xl mt-8 underline decoration-black">
        Complete Routine
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center mt-8"
      >
        <FieldArray
          {...{
            control,
            register,
            exercisesStats,
            getValues,
            setValue,
            errors,
          }}
        />
        <button
          type="submit"
          onClick={handleClick}
          className="z-50 bg-white hover:bg-gray-100 active:scale-95 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Complete Routine
        </button>
      </form>
      <button
        onClick={handleAutoCompleteExercisesWithMostRecentStats}
        className="z-50 bg-white hover:bg-gray-100 active:scale-95 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Auto fill with last routine
      </button>

      <button className="fixed top-0 right-0 z-50" onClick={handleCloseForm}>
        <AiOutlineClose className="text-black w-10 h-10 m-2" />
      </button>
    </div>
  );
};

export default CompletedRoutineForm;
