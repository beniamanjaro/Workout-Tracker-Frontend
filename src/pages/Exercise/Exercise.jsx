import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExerciseDetail from "../../components/Exercise/ExerciseDetail";
import SimilarExercises from "../../components/Exercise/SimilarExercises";
import exercisesService from "../../services/exercises";
import { AuthContext } from "../../context/AuthContext";
import ExerciseYoutubeVideos from "../../components/Exercise/ExerciseYoutubeVideos";

const Exercise = () => {
  const [exerciseDetails, setExerciseDetails] = useState({});
  const [similarExercises, setSimilarExercises] = useState([]);
  const [exerciseYoutubeVideos, setExerciseYoutubeVideos] = useState([]);
  const {
    user: { token },
  } = useContext(AuthContext);
  const { id } = useParams();

  useEffect(() => {
    const getExerciseDetails = async () => {
      const data = await exercisesService.getExerciseById(id, token);
      const youtubeSearch = await exercisesService.getYoutubeSearchExercise(
        data.name
      );
      setExerciseYoutubeVideos(youtubeSearch.items);
      setExerciseDetails(data);
    };
    const getSimilarExercises = async () => {
      const data = await exercisesService.getSimilarExercises(token, id);
      setSimilarExercises(data);
    };
    getExerciseDetails();
    getSimilarExercises();
  }, [id]);

  return (
    <div>
      <ExerciseDetail exerciseDetails={exerciseDetails} />
      <SimilarExercises similarExercises={similarExercises} />
      <ExerciseYoutubeVideos
        exerciseYoutubeVideos={exerciseYoutubeVideos}
        name={exerciseDetails.name}
      />
    </div>
  );
};

export default Exercise;
