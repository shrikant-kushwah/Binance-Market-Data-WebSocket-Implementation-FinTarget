import React from 'react';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  CandlestickController,
  CandlestickElement,
  Tooltip,
  Legend
);

const ChartComponent = ({ data }) => {
  const chartData = {
    datasets: [
      {
        label: 'Candlestick Chart',
        data: data.map((candle) => ({
          x: new Date(candle.time),
          o: candle.open,
          h: candle.high,
          l: candle.low,
          c: candle.close,
        })),
        borderColor: data.map((candle) =>
          candle.close > candle.open ? '#4caf50' : '#f44336'
        ),
        backgroundColor: data.map((candle) =>
          candle.close > candle.open ? 'rgba(76, 175, 80, 0.8)' : 'rgba(244, 67, 54, 0.8)'
        ),
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 255, 255, 0.1)',
        barThickness: 'flex',
        maxBarThickness: 25,
        minBarLength: 5, 
        barPercentage: 0.5, 
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
        },
        grid: {
          color: '#444',
          lineWidth: 1,
        },
        ticks: {
          color: '#fff',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: '#444',
          lineWidth: 1,
        },
        ticks: {
          color: '#fff',
          font: {
            size: 12,
          },
        },
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#fff',
          font: {
            size: 16,
          },
        },
      },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        titleFont: {
          size: 16,
        },
        bodyFont: {
          size: 12,
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
    },
    },
  };

  return (
    <div className="bg-gray-900 p-2 rounded-lg shadow-lg">
      <div className="h-[500px] w-full">
        <Chart className='' type="candlestick" data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ChartComponent;
