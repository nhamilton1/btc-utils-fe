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
import { historicPricesInterface } from "api";


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

const CagrChart = (props: { historicPriceRange: historicPricesInterface[]; }) => {
  const { historicPriceRange } = props;
  // formatting data
  const labels = historicPriceRange.map((x: { date: string; }) => x.date);
  const btc_price_data = historicPriceRange.map((x: { btc_price: number; }) => x.btc_price);
  const gld_price_data = historicPriceRange.map((x: { gld_price: number; }) => x.gld_price);
  const spy_price_data = historicPriceRange.map((x: { spy_price: number; }) => x.spy_price);

  // is this even doing anything?
  const decimation = {
    enabled: true,
    algorithm: "min-max",
  };

  const options = {
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
  } as any;

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
    <Layout style={{width: '100%', height: '69vh'}}>
      <Line data={data} options={options}/>
    </Layout>
  );
};

export default CagrChart;
