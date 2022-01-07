import React from 'react'
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto'
import { Line }            from 'react-chartjs-2'


const CagrChart = props => {
    const { historicPriceRange } = props

    console.log(historicPriceRange)

    const labels = historicPriceRange.map(x => x.date)
    const btc_price_data = historicPriceRange.map(x => x.btc_price)
    const gld_price_data = historicPriceRange.map(x => x.gld_price)
    const spy_price_data = historicPriceRange.map(x => x.spy_price)

    const options = {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: 'Title goes here',
        },
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
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
          label: 'BTC',
          data: btc_price_data,
          borderColor: 'rgb(255,153,0, 0.1)',
          backgroundColor: 'rgba(255,153,0, 0.7)',
          yAxisID: 'y',
        },
        {
          label: 'GLD',
          data: gld_price_data,
          borderColor: 'rgb(53, 162, 235, 0.1)',
          backgroundColor: 'rgba(53, 162, 235, 0.7)',
          yAxisID: 'y1',
        },
        {
          label: 'SPY',
          data: spy_price_data,
          borderColor: 'rgb(0,128,0, 0.1)',
          backgroundColor: 'rgb(0,128,0, 0.7)',
          yAxisID: 'y1',
        }
      ]
    }

    return (
      <Line data={data} options={options}/>
    )
}

export default CagrChart
