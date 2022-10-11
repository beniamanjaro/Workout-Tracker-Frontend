import { useContext, useEffect, useState } from "react";
import HistoryRoutineCard from "../../components/Routine/HistoryRoutineCard";
import { AuthContext } from "../../context/AuthContext";
import completedRoutinesService from "../../services/completedRoutines";
import usersService from "../../services/users";
import Select from "react-select";
import HistoryChart from "./HistoryBarChart";
import SpinningLoader from "../../components/SpinningLoader";
import Skeleton from "react-loading-skeleton";
import HistoryRoutineCardSkeleton from "../../components/Skeletons/HistoryRoutineCardSkeleton";

const History = () => {
  const [completedRoutines, setCompletedRoutines] = useState([]);
  const [timeFrame, setTimeFrame] = useState(3);
  const [timeUnit, setTimeUnit] = useState("week");
  const [statsUnitStep, setStatsUnitStep] = useState(1);

  const {
    user: { userId, token },
  } = useContext(AuthContext);

  useEffect(() => {
    const handleGetCompletedRoutines = async () => {
      const data = await usersService.getHistoryByTimeframe(userId, 3, token);
      setCompletedRoutines(data);
    };
    handleGetCompletedRoutines();
  }, []);

  const selectOptions = [
    {
      label: `1 month`,
      value: 1,
    },
    {
      label: `3 months`,
      value: 3,
    },
    {
      label: `6 months`,
      value: 6,
    },
    {
      label: `12 months`,
      value: 12,
    },
  ];

  const handleSelectDays = () => {
    setTimeUnit("day");
    setStatsUnitStep(2);
  };

  const handleSelectWeeks = () => {
    setTimeUnit("week");
    setStatsUnitStep(1);
  };

  const handleSelectMonths = () => {
    setTimeUnit("month");
    setStatsUnitStep(3);
  };

  const handleChangeTimeframe = async (e) => {
    setTimeFrame(e.value);
    const data = await usersService.getHistoryByTimeframe(
      userId,
      e.value,
      token
    );
    setCompletedRoutines(data);
  };

  return (
    <>
      <div className="md:w-[50vw] w-full">
        <HistoryChart
          completedRoutines={completedRoutines}
          timeFrame={timeFrame}
          timeUnit={timeUnit}
          statsUnitStep={statsUnitStep}
        />
      </div>
      <div className="flex justify-between md:w-[50vw] w-full">
        <div className="flex gap-1">
          <button
            onClick={handleSelectDays}
            className={
              timeUnit === "day"
                ? "inline-flex items-center justify-center border border-white px-4 py-2 text-base font-medium leading-6  whitespace-no-wrap bg-[#06202A] text-white  rounded-md shadow-sm  focus:outline-none focus:shadow-none"
                : "inline-flex items-center justify-center border border-[#06202A] px-4 py-2 text-base font-medium leading-6 text-[#06202A] whitespace-no-wrap bg-white  rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none"
            }
          >
            Days
          </button>
          <button
            onClick={handleSelectWeeks}
            className={
              timeUnit === "week"
                ? "inline-flex items-center justify-center border border-white px-4 py-2 text-base font-medium leading-6  whitespace-no-wrap bg-[#06202A] text-white  rounded-md shadow-sm  focus:outline-none focus:shadow-none"
                : "inline-flex items-center justify-center border border-[#06202A] px-4 py-2 text-base font-medium leading-6 text-[#06202A] whitespace-no-wrap bg-white  rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none"
            }
          >
            Weeks
          </button>
          <button
            onClick={handleSelectMonths}
            className={
              timeUnit === "month"
                ? "inline-flex items-center justify-center border border-white px-4 py-2 text-base font-medium leading-6  whitespace-no-wrap bg-[#06202A] text-white  rounded-md shadow-sm  focus:outline-none focus:shadow-none"
                : "inline-flex items-center justify-center border border-[#06202A] px-4 py-2 text-base font-medium leading-6 text-[#06202A] whitespace-no-wrap bg-white  rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none"
            }
          >
            Months
          </button>
        </div>
        <div className="flex justify-center items-center">
          <p className="mr-2">Timeframe:</p>
          <Select
            options={selectOptions}
            onChange={handleChangeTimeframe}
            placeholder={"3 months"}
          />
        </div>
      </div>

      {completedRoutines.length > 1 ? (
        completedRoutines?.map((cr) => (
          <div className="m-2" key={cr.completedRoutineId}>
            <HistoryRoutineCard completedRoutineData={cr} />
          </div>
        ))
      ) : (
        <>
          <HistoryRoutineCardSkeleton />
          <HistoryRoutineCardSkeleton />
          <div className="mt-8">
            <SpinningLoader />
          </div>
        </>
      )}
    </>
  );
};

export default History;
