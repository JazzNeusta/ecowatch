import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Enregistrez les éléments nécessaires
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const CombinedChart = ({ combinedData }) => {
  const data = {
    labels: combinedData.map((d) => new Date(d.timestamp).toLocaleString()), // Timestamps
    datasets: [
      {
        label: 'Température (°C)',
        data: combinedData.map((d) => d.temperature),
        borderColor: 'red',
        fill: false,
      },
      {
        label: 'Humidité (%)',
        data: combinedData.map((d) => d.humidity),
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'CO2 (ppm)',
        data: combinedData.map((d) => d.CO2),
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'TVOC',
        data: combinedData.map((d) => d.TVOC),
        borderColor: 'purple',
        fill: false,
      },
      {
        label: 'Niveau sonore (dB)',
        data: combinedData.map((d) => d.sound),
        borderColor: 'orange',
        fill: false,
      },
      {
        label: 'PM1.0',
        data: combinedData.map((d) => d.PM1_0),
        borderColor: 'cyan',
        fill: false,
      },
      {
        label: 'PM2.5',
        data: combinedData.map((d) => d.PM2_5),
        borderColor: 'magenta',
        fill: false,
      },
      {
        label: 'PM10',
        data: combinedData.map((d) => d.PM10),
        borderColor: 'yellow',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date et Heure',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Valeurs mesurées',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default CombinedChart;
