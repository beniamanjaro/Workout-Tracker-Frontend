import axios from "axios";
const baseUrl = "https://localhost:7147/";

const login = async (credentials) => {
  const response = await axios.post(baseUrl + "login", credentials, {
    withCredentials: true,
  });
  return response.data;
};

const loginGoogle = async (credentials) => {
  const response = await axios.post(baseUrl + "google", credentials, {
    withCredentials: true,
  });

  return response.data;
};

export default { login, loginGoogle };
