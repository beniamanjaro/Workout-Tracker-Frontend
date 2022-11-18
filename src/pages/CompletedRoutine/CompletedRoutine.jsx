import { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import CompletedRoutineCard from "../../components/CompletedRoutine/CompletedRoutineCard";
import { MuscleSplitChart } from "../../components/CompletedRoutine/MuscleSplitChart";
import StatsTable from "../../components/Progress/StatsTable";
import { AuthContext } from "../../context/AuthContext";
import completedRoutinesService from "../../services/completedRoutines";

const CompletedRoutine = () => {
  const {
    user: { userId, token },
  } = useContext(AuthContext);
  const [completedRoutineData, setCompletedRoutineData] = useState({});
  const [statsObj, setStatsObj] = useState({
    "Total Reps": 0,
    "Total Sets": 0,
    "Total Volume": 0,
  });
  const [muscleSplit, setMuscleSplit] = useState({});
  const { id } = useParams();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    const getCompletedRoutineData = async () => {
      const data = await completedRoutinesService.getCompletedRoutineById(
        id,
        token
      );
      setCompletedRoutineData(data);
      setStatsObj({
        "Total Volume": data?.totalVolume,
        "Total Reps": data?.totalReps,
        "Total Sets": data?.totalSets,
        "Completion Date": new Date(data?.createdAt).toLocaleDateString(
          "en-gb",
          options
        ),
      });
    };
    const getMuscleSplitForCompletedRoutine = async () => {
      const data =
        await completedRoutinesService.getMuscleSplitForCompletedRoutine(
          id,
          token
        );
      let object = data.reduce(
        (obj, item) => Object.assign(obj, { [item.key]: item.value }),
        {}
      );
      setMuscleSplit(object);
    };
    getMuscleSplitForCompletedRoutine();
    getCompletedRoutineData();
  }, []);

  return (
    <div className="gap-2 flex flex-col">
      <div className="flex flex-col gap-2">
        <div>
          <StatsTable stats={statsObj} title={"Stats This Routine"} />
        </div>
        <CompletedRoutineCard
          exercises={completedRoutineData.exercises}
          name={"Exercises"}
        />
      </div>
      <MuscleSplitChart
        labels={Object.keys(muscleSplit)}
        values={Object.values(muscleSplit)}
      />
    </div>
  );
};

export default CompletedRoutine;
