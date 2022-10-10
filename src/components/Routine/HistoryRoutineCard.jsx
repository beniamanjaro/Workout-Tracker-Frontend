const HistoryRoutineCard = ({ completedRoutineData }) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div class="overflow-auto min-w-[50vw] max-w-[50vw] rounded-lg shadow hidden md:block">
      <table class="w-full">
        <thead class="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th class="w-20 p-3 text-sm font-semibold tracking-wide text-left">
              No.
            </th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">
              Workout Plan Name
            </th>
            <th class="p-3 text-sm font-semibold tracking-wide text-left">
              Routine Name
            </th>
            <th class="w-24 p-3 whitespace-nowrap text-sm font-semibold tracking-wide text-left">
              No. Of Reps
            </th>
            <th class="w-24 whitespace-nowrap p-3 text-sm font-semibold tracking-wide text-left">
              No. Of Sets
            </th>
            <th class="w-32 p-3 text-sm font-semibold tracking-wide text-left">
              Volume
            </th>
            <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">
              Date
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr class="bg-white">
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <a href="#" class="font-bold text-blue-500 hover:underline">
                {completedRoutineData.completedRoutineId}
              </a>
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              {completedRoutineData.workoutPlanName}
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              <span class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                {completedRoutineData.routineName}
              </span>
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              {completedRoutineData.totalReps}
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              {completedRoutineData.totalSets}
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
              {completedRoutineData.totalVolume}
            </td>
            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
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
