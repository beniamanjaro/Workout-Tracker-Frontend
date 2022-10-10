import {
  getDayOfYear,
  getMonth,
  getWeek,
  isAfter,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
} from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HistoryChart = ({
  completedRoutines,
  timeFrame,
  timeUnit,
  statsUnitStep,
}) => {
  const currentWeekIndex = getWeek(new Date());
  const currentDayIndex = getDayOfYear(new Date());
  const currentMonthIndex = getMonth(new Date());

  const options = {
    response: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw.y}, ${context.raw.weeksAgo}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: timeUnit,
        },
      },
    },
  };

  const getHistoryStats = () => {
    const groupedStatsByTimeUnitAndTimeframe = getStatsGroupedByTimeUnitStep();
    let weeksInLastSixMonthsDict = {};

    groupedStatsByTimeUnitAndTimeframe.forEach((week) => {
      if (!weeksInLastSixMonthsDict[week]) {
        weeksInLastSixMonthsDict[week] = {
          frequency: 0,
          numberOfReps: 0,
          volume: 0,
        };
      }
    });

    completedRoutines.forEach((cr) => {
      let t = 0;
      Object.keys(weeksInLastSixMonthsDict).forEach((week) => {
        if (isAfter(new Date(cr.createdAt), new Date(week)) && t === 0) {
          weeksInLastSixMonthsDict[week].frequency += 1;
          weeksInLastSixMonthsDict[week].numberOfReps += cr.totalReps;
          weeksInLastSixMonthsDict[week].volume += cr.totalVolume;
          t = 1;
        }
      });
      t = 0;
    });

    const frequencyValues = Object.keys(weeksInLastSixMonthsDict).map(
      (week) => {
        return {
          x: new Date(week),
          y: weeksInLastSixMonthsDict[week].frequency,
          weeksAgo: getLabelForDatasetByTimeUnitStep(week),
        };
      }
    );

    const repsValues = Object.keys(weeksInLastSixMonthsDict).map((week) => {
      return {
        x: new Date(week),
        y: weeksInLastSixMonthsDict[week].numberOfReps,
        weeksAgo: getLabelForDatasetByTimeUnitStep(week),
      };
    });

    const volumeValues = Object.keys(weeksInLastSixMonthsDict).map((week) => {
      return {
        x: new Date(week),
        y: weeksInLastSixMonthsDict[week].volume,
        weeksAgo: getLabelForDatasetByTimeUnitStep(week),
      };
    });

    return {
      datasets: [
        {
          label: "Frequency",
          data: frequencyValues,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "black",
          borderWidth: 2,
        },
        {
          label: "Total Reps",
          data: repsValues,
          backgroundColor: "rgb(95, 158, 160, 0.5)",
          borderColor: "black",
          hidden: true,
          borderWidth: 2,
        },
        {
          label: "Total Volume",
          data: volumeValues,
          backgroundColor: "rgb(125, 249, 255, 0.5)",
          borderColor: "black",
          hidden: true,
          borderWidth: 2,
        },
      ],
    };
  };

  const groupTimeframeStatsByDays = () => {
    const startDate = subMonths(new Date(), timeFrame);
    const statsGroupedByDays = [];
    let days = 0;
    while (isAfter(subDays(new Date(), days), startDate)) {
      let d = new Date();
      d.setHours(0, 0, 0, 0);
      statsGroupedByDays.push(subDays(d, days));
      days += 1;
    }
    return statsGroupedByDays;
  };

  const groupTimeframeStatsByWeeks = () => {
    const startDate = subMonths(new Date(), timeFrame);
    const statsGroupedByWeeks = [];
    let days = 0;
    while (isAfter(startOfWeek(subDays(new Date(), days)), startDate)) {
      let d = new Date();
      d.setHours(0, 0, 0, 0);
      statsGroupedByWeeks.push(startOfWeek(subDays(d, days)));
      days += 7;
    }
    return statsGroupedByWeeks;
  };

  const groupTimeframeStatsByMonths = () => {
    const startDate = subMonths(new Date(), timeFrame);
    const statsGroupedByMonths = [];
    let days = 0;
    while (isAfter(startOfMonth(subDays(new Date(), days)), startDate)) {
      let d = new Date();
      d.setHours(0, 0, 0, 0);
      statsGroupedByMonths.push(startOfMonth(subDays(d, days)));
      days += 30;
    }
    return statsGroupedByMonths;
  };

  const getStatsGroupedByTimeUnitStep = () => {
    switch (statsUnitStep) {
      case 1:
        return groupTimeframeStatsByWeeks();
      case 2:
        return groupTimeframeStatsByDays();
      case 3:
        return groupTimeframeStatsByMonths();
      default:
        return "";
    }
  };

  const getLabelForDatasetByTimeUnitStep = (date) => {
    switch (statsUnitStep) {
      case 1:
        return currentWeekIndex - getWeek(new Date(date)) === 0
          ? `this week`
          : `${currentWeekIndex - getWeek(new Date(date))} weeks ago`;
      case 2:
        return currentDayIndex - getDayOfYear(new Date(date)) === 0
          ? `today`
          : `${currentDayIndex - getDayOfYear(new Date(date))} days ago`;
      case 3:
        return currentMonthIndex - getMonth(new Date(date)) === 0
          ? `this month`
          : `${currentMonthIndex - getMonth(new Date(date))} months ago`;
      default:
        return "";
    }
  };

  const values = getHistoryStats();

  return (
    <>
      <Bar options={options} data={values} />
    </>
  );
};

export default HistoryChart;
