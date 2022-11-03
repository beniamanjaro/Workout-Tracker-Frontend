import React from "react";

const StatsTable = ({ stats, title }) => {
  return (
    <div className="overflow-auto bg-white rounded-lg border border-black shadow ">
      <table className="w-full bg-white">
        <thead>
          <tr>
            <th colSpan={2} className="bg-white whitespace-nowrap">
              {title}
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(stats).map((s, index) => {
            return (
              <tr className="bg-white border-b-2 border-black" key={index}>
                <td className="p-3 text-sm text-black font-semibold whitespace-nowrap">
                  {s}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap ">
                  <div className="flex justify-left items-center gap-2 font-bold text-black hover:underline">
                    {s === "Volume" ? `${stats[s]} kg` : stats[s]}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StatsTable;
