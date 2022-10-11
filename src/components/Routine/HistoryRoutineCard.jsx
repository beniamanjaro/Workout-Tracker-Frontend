const HistoryRoutineCard = ({ completedRoutineData }) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="overflow-auto min-w-[50vw] max-w-[50vw] rounded-lg shadow hidden md:block">
      <table className="w-full">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
              No.
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Workout Plan Name
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Routine Name
            </th>
            <th className="w-24 p-3 whitespace-nowrap text-sm font-semibold tracking-wide text-left">
              No. Of Reps
            </th>
            <th className="w-24 whitespace-nowrap p-3 text-sm font-semibold tracking-wide text-left">
              No. Of Sets
            </th>
            <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
              Volume
            </th>
            <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <tr className="bg-white">
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
              <a href="#" className="font-bold text-blue-500 hover:underline">
                {completedRoutineData.completedRoutineId}
              </a>
            </td>
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
              {completedRoutineData.workoutPlanName}
            </td>
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
              <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                {completedRoutineData.routineName}
              </span>
            </td>
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
              {completedRoutineData.totalReps}
            </td>
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
              {completedRoutineData.totalSets}
            </td>
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
              {completedRoutineData.totalVolume}
            </td>
            <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
              {new Date(completedRoutineData.createdAt).toLocaleDateString(
                "en-gb",
                options
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HistoryRoutineCard;
