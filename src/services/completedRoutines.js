import axios from "axios";
const baseUrl = "https://localhost:7147/api/CompletedRoutines";

const completeRoutine = async (data, token) => {
  const res = await axios.post(
    `${baseUrl}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    { withCredentials: true }
  );
  return res.data;
};

const getCompletedRoutineById = async (id, token) => {
  const res = await axios.get(
    `${baseUrl}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    { withCredentials: true }
  );
  return res.data;
};

const getMostRecentCompletedRoutineExercisesStatsByUserByWorkoutPlanByName =
  async (userId, workoutPlanId, routineName, token) => {
    const res = await axios.get(
      `${baseUrl}/users/${userId}/workout-plans/${workoutPlanId}/routines/${routineName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true }
    );
    return res.data;
  };

const getCompletedRoutinesByUserId = async (id, token) => {
  const res = await axios.get(
    `${baseUrl}/user?userId=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    { withCredentials: true }
  );
  return res.data;
};

const getMuscleSplitForCompletedRoutine = async (id, token) => {
  const res = await axios.get(
    `${baseUrl}/${id}/muscle-split`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    { withCredentials: true }
  );
  return res.data;
};

const getCompletedRoutinesByUserByWorkoutPlan = async (
  userId,
  workoutPlanId,
  token,
  pageNumber,
  pageSize
) => {
  const res = await axios.get(
    `${baseUrl}/users/${userId}/workout-plans/${workoutPlanId}?PageNumber=${pageNumber}&PageSize=${pageSize}`,
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
  completeRoutine,
  getCompletedRoutinesByUserId,
  getCompletedRoutineById,
  getCompletedRoutinesByUserByWorkoutPlan,
  getMuscleSplitForCompletedRoutine,
  getMostRecentCompletedRoutineExercisesStatsByUserByWorkoutPlanByName,
};
