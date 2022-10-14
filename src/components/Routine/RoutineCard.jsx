import { Link } from "react-router-dom";

const RoutineCard = ({ name, dayOrder, exercises }) => {
  return (
    <div className="flex flex-col">
      <table className="bg-white h-24">
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
        </thead>
      </table>
      <table className="bg-white h-12 w-full">
        <tbody>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Exercise Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Weight
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reps
            </th>
          </tr>
          {exercises?.map((s) => (
            <tr key={s.id} className="">
              <td className="px-6 h-12">
                <div className="flex items-center justify-start overflow-hidden">
                  <img
                    className="h-12 w-12 rounded-full"
                    alt={`exercise ${s.exercise?.name} gif`}
                    src={s.exercise?.gifLink}
                  />
                  <Link
                    className="hover:underline"
                    to={`/exercises/${s.exercise?.id}`}
                  >
                    {s.exercise?.name}
                  </Link>
                </div>
              </td>
              <td className="px-6 py-4 h-12 md:whitespace-nowrap">
                {s.weight}
              </td>
              <td className="px-6 py-4 h-12 md:whitespace-nowrap">
                {s.numberOfReps}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoutineCard;
