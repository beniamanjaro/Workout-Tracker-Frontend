import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Body from "../../components/Body/Body";
import CategoriesSlider from "../../components/Exercise/CategoriesSlider";
import { AuthContext } from "../../context/AuthContext.js";

const Home = () => {
  let { user } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    user ? navigate("/workouts") : navigate("/");
  }, []);

  return (
    <div className="bg-[#E7DF9F] flex flex-col h-full">
      <Body />
    </div>
  );
};

export default Home;
