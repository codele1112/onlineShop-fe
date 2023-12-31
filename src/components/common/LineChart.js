import React from "react";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";

const LineChart = ({ chartData }) => {
  return <Line data={chartData}></Line>;
};

export default LineChart;
