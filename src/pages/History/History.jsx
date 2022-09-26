import React, { useContext, useEffect } from "react";
import HistoryRoutineCard from "../../components/Routine/HistoryRoutineCard";
import { AuthContext } from "../../context/AuthContext";
import exercisesService from "../../services/exercises";

const History = () => {
  return (
    <>
      <HistoryRoutineCard />
    </>
  );
};

export default History;
