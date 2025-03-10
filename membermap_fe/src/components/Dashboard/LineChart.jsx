import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = ({ title }) => {
  const data = {
    labels: ["1일", "5일", "10일", "15일", "20일", "25일", "30일"],
    datasets: [
      {
        label: title,
        data: [12, 19, 3, 5, 2, 3, 9],
        borderColor: "#3e95cd",
        fill: false,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>{title}</h3>
      <Line data={data} />
    </div>
  );
};

export default LineChart;