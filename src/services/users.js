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

export default { getUserById };
