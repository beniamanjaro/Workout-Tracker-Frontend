import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExerciseDetail from "../../components/Exercise/ExerciseDetail";
import SimilarExercises from "../../components/Exercise/SimilarExercises";
import exercisesService from "../../services/exercises";
import { AuthContext } from "../../context/AuthContext";
import ExerciseYoutubeVideos from "../../components/Exercise/ExerciseYoutubeVideos";

const Exercise = () => {
  const [exerciseDetails, setExerciseDetails] = useState({});
  const [exerciseYoutubeVideos, setExerciseYoutubeVideos] = useState([]);
  const {
    user: { token },
  } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    if (exerciseDetails.name === undefined) {
      const getExerciseDetails = async () => {
        const data = await exercisesService.getExerciseById(id, token);
        setExerciseDetails(data);
      };
      getExerciseDetails();
    }
    if (exerciseDetails.name !== undefined) {
      const getExerciseYoutubeVideos = async () => {
        const data = await exercisesService.getYoutubeSearchExercise(
          exerciseDetails.name
        );
        setExerciseYoutubeVideos(data.items);
      };
      getExerciseYoutubeVideos();
    }
  }, [exerciseDetails.name, id]);

  return (
    <div>
      <ExerciseDetail exerciseDetails={exerciseDetails} />
      <ExerciseYoutubeVideos
        exerciseYoutubeVideos={exerciseYoutubeVideos}
        name={exerciseDetails.name}
      />
      <SimilarExercises />
    </div>
  );
};

export default Exercise;
