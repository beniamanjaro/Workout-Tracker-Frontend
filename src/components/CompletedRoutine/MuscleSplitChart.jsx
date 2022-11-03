import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function MuscleSplitChart({ values, labels }) {
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "right",
      },
      title: {
        display: true,
        color: "black",
        font: {
          size: 16,
        },
        text: "Muscle Split in Percent %",
      },
    },
    scales: {
      x: {
        min: 0,
        ticks: {
          color: "black",
          beginAtZero: true,
          stepSize: 5,
        },
      },
      y: {
        ticks: {
          color: "black",
          beginAtZero: true,
          font: {
            size: 15,
          },
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: "black",
        borderWidth: 2,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fontColor: "red",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
