import axios from "axios";
const baseUrl = "https://localhost:7147/api/Exercises";

const getExerciseById = async (id, token) => {
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

const getExercisesByName = async (token, name, pageNumber) => {
  const res = await axios.get(
    `${baseUrl}/search/?name=${name}&PageNumber=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    { withCredentials: true }
  );
  return res.data;
};

const getExercisesByCategory = async (token, category, pageNumber) => {
  const res = await axios.get(
    `${baseUrl}/category?category=${category}&PageNumber=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    { withCredentials: true }
  );
  return res.data;
};

const getExercisesNames = async (token) => {
  const res = await axios.get(
    `${baseUrl}/names`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    { withCredentials: true }
  );
  return res.data;
};

const getExercisesCategories = async (token) => {
  const res = await axios.get(
    `${baseUrl}/categories`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    { withCredentials: true }
  );
  return res.data;
};

const getAllExercises = async (token, pageNumber) => {
  const res = await axios.get(
    `${baseUrl}?PageNumber=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    { withCredentials: true }
  );
  return res.data;
};

const getSimilarExercises = async (token, exerciseId) => {
  const res = await axios.get(
    `${baseUrl}/${exerciseId}/similar-exercises`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    { withCredentials: true }
  );
  return res.data;
};

const getApiExercises = async () => {
  const res = await axios.get(
    `https://exercisedb.p.rapidapi.com/exercises`,
    {
      headers: {
        "X-RapidAPI-Key": "bae2af2328msha4c8d67313b2861p1b2bd2jsnebbe61f2481d",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    },
    { withCredentials: true }
  );
  return res.data;
};

const getYoutubeSearchExercise = async (query) => {
  const res = await axios.get(`https://youtube-v31.p.rapidapi.com/search`, {
    params: {
      q: `how to ${query}`,
      part: "snippet,id",
      regionCode: "US",
      maxResults: "6",
      order: "date",
    },
    headers: {
      "X-RapidAPI-Key": "bae2af2328msha4c8d67313b2861p1b2bd2jsnebbe61f2481d",
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  });
  return res.data;
};

const addExercisesBulk = async (exercises, token) => {
  const res = await axios.post(
    `https://localhost:7147/api/Exercises/add-exercises`,
    exercises,
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
  getExerciseById,
  getAllExercises,
  getApiExercises,
  addExercisesBulk,
  getExercisesByName,
  getExercisesCategories,
  getExercisesByCategory,
  getExercisesNames,
  getYoutubeSearchExercise,
  getSimilarExercises,
};
