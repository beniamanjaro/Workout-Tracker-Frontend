import { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import FieldArray from "./FieldArray";
import workoutPlansService from "../../services/workoutPlans";
import completeRoutineService from "../../services/completedRoutines";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

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
  const defaultValues = {
    exercises,
  };

  const {
    user: { token },
  } = useContext(AuthContext);

  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues });

  const onSubmit = async (formData) => {
    const formDataExercises = formData.exercises;
    // const workoutSets = convertExercisesToWorkoutSets(formDataExercises);

    // const routines = workoutPlanData.routines.filter(
    //   (r) => r.id !== routineData.id
    // );

    // const updatedRoutines = [
    //   ...routines,
    //   {
    //     ...routineData,
    //     workoutSets,
    //   },
    // ];
    const completedRoutineData =
      getCompletedRoutineDataFromExercises(formDataExercises);

    // const modified = updatedRoutines.map((r) => {
    //   let updatedWorkoutSets = [];
    //   r.workoutSets.map((ws) => {
    //     let sets = [];
    //     ws.sets.forEach((s) => {
    //       sets.push({
    //         exerciseId: s.exercise.id,
    //         numberOfReps: s.numberOfReps,
    //         weight: s.weight,
    //       });
    //     });
    //     return updatedWorkoutSets.push({ sets });
    //   });
    //   return {
    //     name: r.name,
    //     dayOrderNumber: r.dayOrderNumber,
    //     workoutSets: updatedWorkoutSets,
    //   };
    // });
    // console.log("modified", modified);
    // console.log("test", updatedRoutines);
    const addedCompletedRoutine = await handleCompleteRoutine({
      ...completedRoutineData,
      routineName: routineData.name,
    });
    setRecentCompletedRoutines([
      addedCompletedRoutine,
      ...recentCompletedRoutines,
    ]);
    notifySuccess();
    setCompleteRoutineActive(false);
    // handleUpdateWorkoutPlan(modified);
    // setCompleteRoutineActive(false);
    // console.log("routines", routines);
    // console.log("workoutsets", workoutSets);
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

  // const convertExercisesToWorkoutSets = (exercises) => {
  //   let workoutSets = [];
  //   let workoutSetCount = 0;

  //   const updateWorkoutSet = workoutPlanData.routines.filter(
  //     (r) => r.id === routineData.id
  //   )[0];

  //   for (let i = 0; i <= exercises.length; i++) {
  //     let temp = [];
  //     if (exercises[i]) {
  //       temp.push(exercises[i]);
  //     }
  //     while (
  //       i < exercises.length - 1 &&
  //       exercises[i].exercise.name === exercises[i + 1].exercise.name
  //     ) {
  //       temp.push(exercises[i + 1]);
  //       i++;
  //     }
  //     if (temp.length !== 0) {
  //       workoutSets.push({
  //         sets: temp,
  //         id: updateWorkoutSet.workoutSets[workoutSetCount].id,
  //       });
  //       workoutSetCount++;
  //     }
  //     temp = [];
  //   }
  //   return workoutSets;
  // };

  // const handleUpdateWorkoutPlan = async (routines) => {
  //   console.log("formData", workoutPlanData);
  //   console.log("token", token);
  //   const details = await workoutPlansService.updateWorkoutPlan(
  //     { ...workoutPlanData, routines },
  //     id,
  //     token
  //   );
  //   console.log("details", details);
  //   setWorkoutPlanData(details);
  // };

  const handleCompleteRoutine = async (data) => {
    return await completeRoutineService.completeRoutine(data, token);
  };

  return (
    <div className="h-screen overflow-scroll bg-white fixed top-0 w-screen left-0 lg:left-28 flex flex-col items-center">
      <h1 className="text-center text-3xl mt-8 underline decoration-black">
        Workout Plan Details
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center mt-8"
      >
        <FieldArray
          {...{
            control,
            register,
            defaultValues,
            getValues,
            setValue,
            errors,
          }}
        />
        <button
          type="submit"
          className="z-50 bg-white hover:bg-gray-100 active:scale-95 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Complete Routine
        </button>
      </form>

      <button
        className="fixed top-0 right-0 z-50"
        onClick={() => setCompleteRoutineActive(false)}
      >
        <AiOutlineClose className="text-black w-10 h-10 m-2" />
      </button>
    </div>
  );
};

export default CompletedRoutineForm;
