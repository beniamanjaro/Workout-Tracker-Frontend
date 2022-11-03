import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ labels, values }) => {
  const labels2 = labels.map((label, index) => `${label} - ${values[index]}`);

  const data = {
    labels: labels2,
    datasets: [
      {
        label: "# of Votes",
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: ["black", "black", "black", "black", "black", "black"],
        borderWidth: 0.5,
        borderRadius: 20,
        cutout: "90%",
      },
    ],
    text: "45",
  };
  const options = {
    plugins: [],
  };

  return (
    <div className="flex-col justify-center items-center">
      <p className="text-xl text-center">
        Number of exercises completed
        <br /> by each muscle group:
      </p>
      <Doughnut type="doughnut" data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
