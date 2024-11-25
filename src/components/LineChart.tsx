import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler, Tooltip, Legend);

interface YearData {
  years: number[];
}

interface LineChartProps {
  yearData: YearData;
  backgroundColor?: string;
}

const LineChart: React.FC<LineChartProps> = ({
  yearData,
  backgroundColor = "#1A1D26",
}) => {
  const [range, setRange] = useState<"day" | "week" | "month" | "year">("day");

  const getXAxisLabels = (range: string): string[] => {
    switch (range) {
      case "day":
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      case "week":
        return ["Week 1", "Week 2", "Week 3", "Week 4"];
      case "month":
        return [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
      case "year":
        return yearData.years.map(String);
      default:
        return [];
    }
  };

  const xAxisLabels = getXAxisLabels(range);

  const generateData = (count: number): number[] =>
    Array.from({ length: count }, () => Math.floor(Math.random() * 101));

  const datasets =
    range === "year"
      ? [
          {
            label: "Yearly Data",
            data: yearData.years.map(() => Math.floor(Math.random() * 101)),
            borderColor: `hsl(200, 70%, 50%)`,
            backgroundColor: `hsla(200, 70%, 50%, 0.2)`,
            fill: true,
            tension: 0.4,
          },
        ]
      : yearData.years.map((year, index) => ({
          label: `${year}`,
          data: generateData(xAxisLabels.length),
          borderColor: `hsl(${(index * 120) % 360}, 70%, 50%)`,
          backgroundColor: `hsla(${(index * 120) % 360}, 70%, 50%, 0.2)`,
          fill: true,
          tension: 0.4,
        }));

  const data = {
    labels: xAxisLabels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
      x: {
        ticks: {
          autoSkip: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const, // Move legend to the bottom
        labels:{
            usePointStyle:true
        }
      },
    },
    
  };

  return (
    <div className="w-full h-full rounded-lg">
      {/* Chart Container with dynamic background color */}
      <div
        className="w-full h-full p-4 rounded-lg"
        style={{ backgroundColor }}
      >
        <Line data={data} options={options} />
      </div>
    </div>
  );
  
  
};


export default LineChart;

// const LineChartRender: React.FC = () => {
//     const yearData = { years: [2022, 2023, 2024] }; // Dynamic year range

//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900">
//         <LineChart yearData={yearData} backgroundColor="#1A1D26" />
//       </div>
//     );
// };

// export default LineChartRender