import React from "react";
import { Link } from "react-router-dom";

const TopExercisesTable = ({ topExercises }) => {
  const ordinal_suffix_of = (i) => {
    var j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return i + "st";
    }
    if (j === 2 && k !== 12) {
      return i + "nd";
    }
    if (j === 3 && k !== 13) {
      return i + "rd";
    }
    return i + "th";
  };

  return (
    <div className="overflow-auto bg-white rounded-lg border border-black shadow hidden md:block">
      <table className="w-full bg-white">
        <thead>
          <tr>
            <th colSpan={2} className="bg-white whitespace-nowrap">
              Your Favourite Exercises
            </th>
          </tr>
          <tr className="bg-white">
            <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
              Rank
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Name
            </th>
          </tr>
        </thead>
        <tbody>
          {topExercises.map((te, index) => {
            return (
              <tr className="bg-white border-b-2 border-black" key={index}>
                <td className="p-3 text-sm text-black font-semibold whitespace-nowrap">
                  {ordinal_suffix_of(index + 1)}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap ">
                  <div className="flex justify-left items-center gap-2">
                    <Link
                      to="/exercises"
                      className="font-bold text-black hover:underline"
                    >
                      {te}
                    </Link>
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

export default TopExercisesTable;
