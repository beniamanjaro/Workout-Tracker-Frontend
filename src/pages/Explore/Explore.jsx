import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ExploreBody from "../../components/Explore/ExploreBody";
import ExploreTop from "../../components/Explore/ExploreTop";
import { AuthContext } from "../../context/AuthContext";
import workoutPlansService from "../../services/workoutPlans";

const Explore = () => {
  const [searchValue, setSearchValue] = useSearchParams();

  const [workoutPlans, setWorkoutPlans] = useState([]);
  const {
    user: { userId, token },
  } = useContext(AuthContext);

  useEffect(() => {
    const getWorkoutPlansBySearch = async () => {
      const data = await workoutPlansService.getWorkoutPlansBySearch(
        searchValue.get("query") || "",
        searchValue.get("sortBy") || "",
        1,
        20,
        searchValue.get("timesPerWeek") || "",
        token
      );
      setWorkoutPlans(data.data);
    };
    getWorkoutPlansBySearch();
  }, []);

  return (
    <div className="w-full h-full">
      <ExploreTop setWorkoutPlans={setWorkoutPlans} />
      <ExploreBody workoutPlans={workoutPlans} />
    </div>
  );
};

export default Explore;
