import axios from "axios";
const baseUrl = "https://localhost:7147/api/Users";

const getUserById = async (id, token) => {
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

const getHistoryByTimeframe = async (
  userId,
  timeframe,
  token,
  pageNumber,
  pageSize
) => {
  const res = await axios.get(
    `${baseUrl}/${userId}/history?timeframeInMonths=${timeframe}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    { withCredentials: true }
  );
  return res.data;
};

const subscribeToWorkoutPlan = async (userId, workoutPlanId, token) => {
  const res = await axios.put(
    `${baseUrl}/${userId}/workout-plans/subscribe?workoutPlanId=${workoutPlanId}`,
    "",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    { withCredentials: true }
  );
  return res.data;
};

export default { getUserById, subscribeToWorkoutPlan, getHistoryByTimeframe };
