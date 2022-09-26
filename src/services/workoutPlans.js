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

export default { getWorkoutPlanById, createWorkoutPlan };
