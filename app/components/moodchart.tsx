import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

export interface ProcessedMoodData {
  date: string;
  averagePercent: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const MoodChart = ({ data }: { data: ProcessedMoodData[] }) => {
  const chartData = {
    labels: data.map((entry) => entry.date),
    datasets: [
      {
        label: "Average Mood Percentage",
        data: data.map((entry) => entry.averagePercent),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};
