import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Decimation,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Layout from "antd/lib/layout/layout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Decimation
);

const CagrChart = (props) => {
  const { historicPriceRange } = props;
  // formatting data
  const labels = historicPriceRange.map((x) => x.date);
  const btc_price_data = historicPriceRange.map((x) => x.btc_price);
  const gld_price_data = historicPriceRange.map((x) => x.gld_price);
  const spy_price_data = historicPriceRange.map((x) => x.spy_price);

  // is this even doing anything?
  const decimation = {
    enabled: true,
    algorithm: "min-max",
  };

  const options = {
    tension: 1,
    spanGaps: true,
    animation: false,
    normalized: true,
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "nearest",
      axis: "x",
    },
    plugins: {
      decimation: decimation,
      title: {
        display: true,
        text: "Cagr Chart",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
      },
    },
  };

  const data = {
    type: "line",
    labels,
    datasets: [
      {
        label: "BTC",
        data: btc_price_data,
        borderColor: "rgb(255,153,0, 1)",
        backgroundColor: "rgba(255,153,0, 0.7)",
        yAxisID: "y",
        pointRadius: 0,
      },
      {
        label: "GLD",
        data: gld_price_data,
        borderColor: "rgb(53, 162, 235, 1)",
        backgroundColor: "rgba(53, 162, 235, 0.7)",
        yAxisID: "y1",
        pointRadius: 0,
      },
      {
        label: "SPY",
        data: spy_price_data,
        borderColor: "rgb(0,128,0, 1)",
        backgroundColor: "rgb(0,128,0, 0.7)",
        yAxisID: "y1",
        pointRadius: 0,
      },
    ],
  };

  return (
    <Layout>
      <Line data={data} options={options} />
    </Layout>
  );
};

export default CagrChart;
