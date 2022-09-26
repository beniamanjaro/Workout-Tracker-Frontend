import React from "react";

const RoutineCard = ({ name, dayOrder, exercises }) => {
  console.log(exercises);
  return (
    <table className="bg-white min-w-full">
      <thead>
        <tr>
          <th
            colSpan={3}
            className="text-xl border border-black bg-amber-500 text-center"
          >
            &nbsp;{`day-${dayOrder}`}
          </th>
        </tr>
        <tr>
          <th
            colSpan={3}
            className="text-xl border border-black bg-white text-center"
          >
            &nbsp;{name}
          </th>
        </tr>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Exercise Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Sets
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Reps
          </th>
        </tr>
      </thead>
      <tbody className="">
        {exercises?.map((e) => (
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full"
                  alt={`exercise ${e.name} gif`}
                  src={e.gifLink}
                />
                {e.name}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{e.name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{e.name}</td>
          </tr>
        ))}
        {/* <div>
            <div className="flex">
              <button class="bg-white hover:bg-gray-100 flex-grow text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Edit Routine
              </button>
              <button class="bg-red-600 hover:bg-red-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Delete
              </button>
            </div>
          </div> */}
      </tbody>
    </table>
  );
};

export default RoutineCard;
