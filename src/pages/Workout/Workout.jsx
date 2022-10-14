import { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RoutineCard from "../../components/Routine/RoutineCard";
import { AuthContext } from "../../context/AuthContext";
import workoutPlanService from "../../services/workoutPlans";
import exercisesService from "../../services/exercises";
import userService from "../../services/users";
import completedRoutinesService from "../../services/completedRoutines";
import WorkoutPlanUpdateFormStep1 from "../../components/Workout/WorkoutPlanUpdateFormStep1";
import WorkoutPlanUpdateFormStep2 from "../../components/Workout/WorkoutPlanUpdateFormStep2";
import CompletedRoutineForm from "../../components/CompletedRoutine/CompletedRoutineForm";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import TopUsersTable from "../../components/Workout/TopUsersTable";
import SpinningLoader from "../../components/SpinningLoader";
import HistoryRoutineCard from "../../components/Routine/HistoryRoutineCard";
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const data = {
  labels: [
    "Back",
    "Cardio",
    "Chest",
    "Lower Arms",
    "Lower Legs",
    "Neck",
    "Shoulders",
    "Upper Arms",
    "Upper Legs",
    "Waist",
  ],
  datasets: [],
};

const Workout = () => {
  const [workoutPlanDetails, setWorkoutPlanDetails] = useState({});
  const [workoutPlanAuthorDetails, setWorkoutPlanAuthorDetails] = useState({});
  const [recentCompletedRoutines, setRecentCompletedRoutines] = useState([]);
  const [visitingUserDetails, setVisitingUserDetails] = useState({});
  const [routineData, setRoutineData] = useState({});
  const [muscleSplitData, setMuscleSplitData] = useState([]);
  const [exercisesNames, setExercisesNames] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [completeRoutineActive, setCompleteRoutineActive] = useState(false);
  const [step, setStep] = useState(1);
  const [createWorkoutFormActive, setCreateWorkoutFormActive] = useState(false);
  const {
    user: { userId, token },
  } = useContext(AuthContext);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    userId: workoutPlanDetails.userId,
    name: "",
    timesPerWeek: 0,
    routines: "",
  });

  const navigate = useNavigate();

  const labels = [
    "Back",
    "Cardio",
    "Chest",
    "Lower Arms",
    "Lower Legs",
    "Neck",
    "Shoulders",
    "Upper Arms",
    "Upper Legs",
    "Waist",
  ];

  const dataSets = muscleSplitData?.map((ms) => {
    const routine = workoutPlanDetails.routines?.filter(
      (r) => r.dayOrderNumber === ms.dayOrder
    )[0];
    return {
      label: `${routine?.name} (day ${routine?.dayOrderNumber})`,
      data: labels.map((l) =>
        ms[l.toLowerCase()] != null
          ? ms[l.toLowerCase()]
          : Math.floor(Math.random() * 11)
      ),
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
        Math.random() * 255
      )},${Math.floor(Math.random() * 255)},0.2)`,
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    };
  });

  const options = exercisesNames?.map((e, index) => {
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

  const handleDeleteWorkoutPlan = () => {
    workoutPlanService.deleteWorkoutPlanById(id, token);

    navigate("/workouts");
  };

  const handleSubscribeToWorkoutPlan = async () => {
    await userService.subscribeToWorkoutPlan(
      visitingUserDetails.id,
      workoutPlanDetails.id,
      token
    );
    setVisitingUserDetails({
      ...visitingUserDetails,
      workoutPlans: visitingUserDetails.workoutPlans.concat(workoutPlanDetails),
    });
  };

  useEffect(() => {
    if (workoutPlanDetails.userId === undefined) {
      const getWorkoutPlanDetailsById = async () => {
        try {
          const data = await workoutPlanService.getWorkoutPlanById(id, token);
          setWorkoutPlanDetails(data);
        } catch (err) {
          navigate("/workouts");
        }
      };
      getWorkoutPlanDetailsById();
    }
    const getWorkoutPlanAuthorDetails = async () => {
      const data = await userService.getUserById(
        workoutPlanDetails.userId,
        token
      );
      setWorkoutPlanAuthorDetails(data);
    };
    if (userId !== undefined) {
      console.log(userId);
      const getVisitingUserDetails = async () => {
        const data = await userService.getUserById(userId, token);
        setVisitingUserDetails(data);
      };
      getVisitingUserDetails();
    }
    const getTopUsersForWorkoutPlan = async () => {
      const data = await workoutPlanService.getTopUsersForWorkoutPlanById(
        id,
        token
      );
      setTopUsers(data.reverse());
    };
    const getMuscleSplitPercentages = async () => {
      const data = await workoutPlanService.getWorkoutPlanMuscleSplitStats(
        id,
        token
      );
      setMuscleSplitData(data);
    };
    const handleGetExercisesNames = async () => {
      const data = await exercisesService.getExercisesNames(token);
      setExercisesNames(data);
    };
    const GetRecentCompletedRoutines = async () => {
      const data =
        await completedRoutinesService.getCompletedRoutinesByUserByWorkoutPlan(
          userId,
          id,
          token
        );
      setRecentCompletedRoutines(data);
    };
    getMuscleSplitPercentages();
    handleGetExercisesNames();
    getWorkoutPlanAuthorDetails();
    getTopUsersForWorkoutPlan();
    GetRecentCompletedRoutines();
  }, [workoutPlanDetails]);
  return (
    <>
      {!!workoutPlanAuthorDetails.username ? (
        <div className="w-full">
          <div className="flex flex-col justify-center items-center m-auto w-[50vw]">
            <div className="">
              {userId !== workoutPlanDetails.userId ? (
                visitingUserDetails.workoutPlans.filter(
                  (wp) => wp.id === workoutPlanDetails.id
                ).length === 1 ? (
                  "(Subscriber)"
                ) : (
                  <button onClick={handleSubscribeToWorkoutPlan}>
                    Subscribe
                  </button>
                )
              ) : (
                "(Owner)"
              )}
            </div>
            <div className="text-center justify-self-center text-3xl">
              {workoutPlanDetails?.name}
            </div>
            {!!workoutPlanAuthorDetails.username && (
              <div className="text-xl self-end mr-12">{`created by ${workoutPlanAuthorDetails?.username}`}</div>
            )}
          </div>
          {userId === workoutPlanDetails.userId && (
            <div className="flex lg:justify-end gap-2 lg:mr-16 m-2">
              <button
                className="bg-green-500 w-full lg:max-w-[15vw] hover:bg-gray-100 active:scale-95 text-gray-800 font-semibold py-2 px-4 border border-black rounded shadow"
                onClick={handleShowForm}
              >
                Edit Workout Plan
              </button>
              <button
                className="bg-red-500 w-full lg:max-w-[15vw] hover:bg-gray-100 active:scale-95 text-gray-800 font-semibold py-2 px-4 border border-black rounded shadow"
                onClick={handleDeleteWorkoutPlan}
              >
                Delete Workout Plan
              </button>
            </div>
          )}
          <div className="flex mt-8 mb-8">
            <div className="bg-white border m-auto max-w-[80vw] border-black text-xl lg:ml-16 lg:w-[40vw]">
              <Radar data={{ ...data, datasets: dataSets }} />
            </div>
            <div className="mr-2">
              <TopUsersTable topUsers={topUsers} />
            </div>
          </div>

          {createWorkoutFormActive && (
            <div className="overflow-y-auto fixed w-screen bg-white top-0 h-screen left-0 lg:left-28">
              {getCurrentStepForm()}
            </div>
          )}
          <h2 className="text-center text-2xl">Routines</h2>

          <div className="m-4 grid p-4 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 md:gap-8 md:ml-12 md:mr-12">
            {workoutPlanDetails.routines?.map((r) => {
              return (
                <div className="flex flex-col" key={r.id}>
                  <RoutineCard
                    name={r.name}
                    dayOrder={r.dayOrderNumber}
                    workoutSets={r.name}
                    exercises={r.workoutSets
                      ?.flatMap((ws) => ws.sets)
                      .flatMap((s) => s)}
                  />
                  {(visitingUserDetails.workoutPlans?.filter(
                    (wp) => wp.id === workoutPlanDetails.id
                  ).length === 1 ||
                    userId === workoutPlanDetails.userId) && (
                    <button
                      onClick={() => {
                        setCompleteRoutineActive(true);
                        setRoutineData(r);
                      }}
                      className="bg-white border border-black"
                    >
                      Complete Routine
                    </button>
                  )}
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
                  setWorkoutPlanData={setWorkoutPlanDetails}
                  visitingUserDetails={visitingUserDetails}
                  workoutPlanData={workoutPlanDetails}
                />
              </div>
            )}
          </div>
          <div className="flex items-center flex-col">
            <h3 className="text-2xl">Recent Activity</h3>
            {recentCompletedRoutines.map((cr) => (
              <div className="m-2" key={cr.completedRoutineId}>
                <HistoryRoutineCard completedRoutineData={cr} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <SpinningLoader />
      )}
    </>
  );
};

export default Workout;
