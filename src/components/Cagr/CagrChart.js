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
  Legend
);

const CagrChart = (props) => {
  const { historicPriceRange } = props;
  const labels = historicPriceRange.map((x) => x.date);
  const btc_price_data = historicPriceRange.map((x) => x.btc_price);
  const gld_price_data = historicPriceRange.map((x) => x.gld_price);
  const spy_price_data = historicPriceRange.map((x) => x.spy_price);

  const options = {
    normalized: true,
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
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
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "BTC",
        data: btc_price_data,
        borderColor: "rgb(255,153,0, 0.1)",
        backgroundColor: "rgba(255,153,0, 0.7)",
        yAxisID: "y",
      },
      {
        label: "GLD",
        data: gld_price_data,
        borderColor: "rgb(53, 162, 235, 0.1)",
        backgroundColor: "rgba(53, 162, 235, 0.7)",
        yAxisID: "y1",
      },
      {
        label: "SPY",
        data: spy_price_data,
        borderColor: "rgb(0,128,0, 0.1)",
        backgroundColor: "rgb(0,128,0, 0.7)",
        yAxisID: "y1",
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
