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

export default { completeRoutine, getCompletedRoutinesByUserId };
