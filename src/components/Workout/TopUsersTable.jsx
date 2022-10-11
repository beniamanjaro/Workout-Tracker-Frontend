import { BiMedal } from "react-icons/bi";

const TopUsersTable = ({ topUsers }) => {
  const getMedalColor = (num) => {
    switch (num) {
      case 0:
        return "purple";
      case 1:
        return "grey";
      case 2:
        return "#ff7f50";
      default:
        return undefined;
    }
  };

  return (
    <div className="overflow-auto bg-white rounded-lg border border-black shadow hidden md:block">
      <table className="w-full bg-white">
        <thead>
          <tr>
            <th colSpan={2} className="bg-white whitespace-nowrap">
              most used by
            </th>
          </tr>
          <tr className="bg-white">
            <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
              Username
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Frequency
            </th>
          </tr>
        </thead>
        <tbody>
          {topUsers.map((tu, index) => {
            const style = getMedalColor(index);
            return (
              <tr className="bg-white border-b-2 border-black" key={index}>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap ">
                  <div
                    style={{ color: style }}
                    className="flex justify-left items-center gap-2"
                  >
                    <BiMedal className="h-8" />
                    <a
                      href="#"
                      className="font-bold text-blue-500 hover:underline"
                    >
                      {tu.username}
                    </a>
                  </div>
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {tu.frequency}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TopUsersTable;
