import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import exercisesService from "../services/exercises";

const PopulateDbWithEx = () => {
  const {
    user: { userId, token },
  } = useContext(AuthContext);

  useEffect(() => {
    const getExer = async () => {
      const exs = await exercisesService.getApiExercises();
      const changedExers = exs.map((item) => {
        return {
          name: item.name,
          category: item.bodyPart,
          equipment: item.equipment,
          gifLink: item.gifUrl,
          muscle: item.target,
        };
      });
      await exercisesService.addExercisesBulk(changedExers, token);
    };
    getExer();
  }, []);

  return <div>PopulateDbWithEx</div>;
};

export default PopulateDbWithEx;
