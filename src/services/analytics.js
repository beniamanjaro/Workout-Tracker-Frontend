import axios from "axios";
const baseUrl = "https://localhost:7147/api/Users";

const getExercisesCountByMuscleGroup = async (userId, token) => {
  const res = await axios.get(
    `${baseUrl}/${userId}/analytics/completed-exercises`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    { withCredentials: true }
  );
  return res.data;
};

const getTopUsedExercises = async (userId, size, token) => {
  const res = await axios.get(
    `${baseUrl}/${userId}/analytics/most-used-exercises?Size=${size}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    { withCredentials: true }
  );
  return res.data;
};

const getTopUsedWorkoutPlans = async (userId, size, token) => {
  const res = await axios.get(
    `${baseUrl}/${userId}/analytics/most-used-workout-plans?Size=${size}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    { withCredentials: true }
  );
  return res.data;
};

const getAllTimeStats = async (userId, token) => {
  const res = await axios.get(
    `${baseUrl}/${userId}/analytics`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    { withCredentials: true }
  );
  return res.data;
};

export default {
  getExercisesCountByMuscleGroup,
  getTopUsedExercises,
  getTopUsedWorkoutPlans,
  getAllTimeStats,
};
