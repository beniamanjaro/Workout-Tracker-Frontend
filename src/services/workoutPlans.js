import axios from "axios";
const baseUrl = "https://localhost:7147/api/WorkoutPlans";

const getWorkoutPlanById = async (id, token) => {
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

const getTopUsersForWorkoutPlanById = async (id, token) => {
  const res = await axios.get(
    `${baseUrl}/${id}/top-users`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    { withCredentials: true }
  );
  return res.data;
};

const getWorkoutPlanMuscleSplitStats = async (id, token) => {
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

const deleteWorkoutPlanById = async (id, token) => {
  const res = await axios.delete(
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

const updateWorkoutPlan = async (data, id, token) => {
  const res = await axios.put(
    `${baseUrl}/${id}`,
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

const createWorkoutPlan = async (data, token) => {
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

export default {
  getWorkoutPlanById,
  createWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlanById,
  getWorkoutPlanMuscleSplitStats,
  getTopUsersForWorkoutPlanById,
};
