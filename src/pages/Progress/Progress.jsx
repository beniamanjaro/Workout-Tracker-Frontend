import { useContext, useState } from "react";
import { useEffect } from "react";
import DoughnutChart from "../../components/Progress/DoughnutChart";
import StatsTable from "../../components/Progress/StatsTable";
import TopExercisesTable from "../../components/Progress/TopExercisesTable";
import TopWorkoutPlansTable from "../../components/Progress/TopWorkoutPlansTable";
import { AuthContext } from "../../context/AuthContext";
import analyticsService from "../../services/analytics";

const Progress = () => {
  const [exercisesByMuscleGroupData, setExercisesByMuscleGroupData] = useState(
    {}
  );
  const [statsData, setStatsData] = useState({});
  const [topFiveExercises, setTopFiveExercises] = useState([]);
  const [topThreeWorkoutPlans, setTopThreeWorkoutPlans] = useState([]);
  const {
    user: { userId, token },
  } = useContext(AuthContext);

  useEffect(() => {
    const getExercisesCountByMuscleGroup = async () => {
      const data = await analyticsService.getExercisesCountByMuscleGroup(
        userId,
        token
      );
      setExercisesByMuscleGroupData(data);
    };
    const getTopFiveUsedExercises = async () => {
      const data = await analyticsService.getTopUsedExercises(userId, 5, token);
      setTopFiveExercises(data);
    };
    const getStatsData = async () => {
      const data = await analyticsService.getAllTimeStats(userId, token);
      setStatsData(data);
    };
    const getTopThreeUsedWorkoutPlans = async () => {
      const data = await analyticsService.getTopUsedWorkoutPlans(
        userId,
        3,
        token
      );
      setTopThreeWorkoutPlans(data);
    };
    getTopThreeUsedWorkoutPlans();
    getTopFiveUsedExercises();
    getExercisesCountByMuscleGroup();
    getStatsData();
  }, []);

  return (
    <div className="flex">
      <div className="max-w-[20vw]">
        <DoughnutChart
          labels={Object.keys(exercisesByMuscleGroupData)}
          values={Object.values(exercisesByMuscleGroupData)}
        />
      </div>
      <div className="flex gap-2">
        <div>
          <TopExercisesTable topExercises={topFiveExercises} />
        </div>
        <div>
          <TopWorkoutPlansTable topWorkoutPlans={topThreeWorkoutPlans} />
        </div>
        <div>
          <StatsTable stats={statsData} />
        </div>
      </div>
    </div>
  );
};

export default Progress;
