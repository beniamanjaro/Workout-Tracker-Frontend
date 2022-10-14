import { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import CompletedRoutineCard from "../../components/CompletedRoutine/CompletedRoutineCard";
import { AuthContext } from "../../context/AuthContext";
import completedRoutinesService from "../../services/completedRoutines";

const CompletedRoutine = () => {
  const {
    user: { userId, token },
  } = useContext(AuthContext);
  const [completedRoutineData, setCompletedRoutineData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getCompletedRoutineData = async () => {
      const data = await completedRoutinesService.getCompletedRoutineById(
        id,
        token
      );
      setCompletedRoutineData(data);
    };
    getCompletedRoutineData();
  }, []);

  console.log(completedRoutineData);

  return (
    <div>
      <CompletedRoutineCard
        exercises={completedRoutineData.exercises}
        name={completedRoutineData.routineName}
      />
    </div>
  );
};

export default CompletedRoutine;
