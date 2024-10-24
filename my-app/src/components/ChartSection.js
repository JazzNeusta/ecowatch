// // Affiche les graphiques des données des capteurs.
// import React from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import { Grid } from '@mui/material';

// const ChartSection = ({ temperatureData, humidityData, CO2Data, TVOCData, soundData, PM1_0Data, PM2_5Data, PM10Data }) => {
//   const options = (title, data, color, min, max) => ({
//     chart: {
//       type: 'spline',  // Utilisation de 'spline' pour lisser la courbe
//       backgroundColor: '#2E2F45',
//     },
//     title: {
//       text: title,
//       style: { color: '#fff' },
//     },
//     xAxis: {
//       type: 'datetime',
//       title: {
//         text: 'Time',
//         style: { color: '#fff' },
//       },
//     },
//     yAxis: {
//       title: {
//         text: 'Values',
//         style: { color: '#fff' },
//       },
//       min: min,
//       max: max,
//     },
//     series: [{
//       data: data,
//       color: color,
//       lineWidth: 2,
//       marker: {
//         enabled: true,
//       },
//     }],
//   });

//   return (
//     <Grid container spacing={3} style={{ marginTop: 20 }}>
//       <Grid item xs={6}>
//         <HighchartsReact highcharts={Highcharts} options={options('Temperature over time', temperatureData, '#FF0000', 15, 40)} />
//       </Grid>
//       <Grid item xs={6}>
//         <HighchartsReact highcharts={Highcharts} options={options('Humidity over time', humidityData, '#00FF00', 0, 100)} />
//       </Grid>
//       <Grid item xs={6}>
//         <HighchartsReact highcharts={Highcharts} options={options('CO2 over time', CO2Data, '#0000FF', 300, 1200)} />
//       </Grid>
//       <Grid item xs={6}>
//         <HighchartsReact highcharts={Highcharts} options={options('TVOC over time', TVOCData, '#FFFF00', 0, 500)} />
//       </Grid>
//       <Grid item xs={6}>
//         <HighchartsReact highcharts={Highcharts} options={options('Sound over time', soundData, '#DF5353', 20, 100)} />
//       </Grid>
//       <Grid item xs={6}>
//         <HighchartsReact highcharts={Highcharts} options={options('PM1.0 over time', PM1_0Data, '#8E44AD', 0, 500)} />  {/* Nouveau graphique PM1.0 */}
//       </Grid>
//       <Grid item xs={6}>
//         <HighchartsReact highcharts={Highcharts} options={options('PM2.5 over time', PM2_5Data, '#16A085', 0, 500)} />  {/* Nouveau graphique PM2.5 */}
//       </Grid>
//       <Grid item xs={6}>
//         <HighchartsReact highcharts={Highcharts} options={options('PM10 over time', PM10Data, '#F39C12', 0, 500)} />  {/* Nouveau graphique PM10 */}
//       </Grid>
//     </Grid>
//   );
// };

// export default ChartSection;


// components/ChartSection.js
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Grid } from '@mui/material';

const ChartSection = ({ temperatureData, humidityData, CO2Data, TVOCData, soundData, PM1_0Data, PM2_5Data, PM10Data }) => {
  const options = (title, data, color, min, max, yAxisTitle) => ({
    chart: {
      type: 'line', 
      backgroundColor: '#2E2F45',
      height: 300,  // Réduire la hauteur pour un effet compact
    },
    title: {
      text: title,
      style: { color: '#fff' },
    },
    xAxis: {
      categories: data.map(point => new Date(point[0]).toLocaleTimeString()),  // Utilisation des timestamps pour des points plus fréquents
      title: {
        text: 'Time',
        style: { color: '#fff' },
      },
    },
    yAxis: {
      title: {
        text: yAxisTitle,  // Titre de l'axe Y selon les données
        style: { color: '#fff' },
      },
      min: min,
      max: max,
      startOnTick: true, 
      endOnTick: true,   // Pour bien définir les limites des points
    },
    series: [{
      name: title,
      data: data.map(point => point[1]),  // Les valeurs des points
      color: color,
      lineWidth: 2,
      marker: {
        enabled: true, 
        radius: 3, // Réduire légèrement les marqueurs pour plus de granularité
      },
    }],
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        marker: {
          enabled: true,
        }
      }
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  });

  return (
    <Grid container spacing={3} style={{ marginTop: 20 }}>
      <Grid item xs={6}>
        <HighchartsReact highcharts={Highcharts} options={options('Temperature over time', temperatureData, '#FF5733', 15, 40, 'Température (°C)')} />
      </Grid>
      <Grid item xs={6}>
        <HighchartsReact highcharts={Highcharts} options={options('Humidity over time', humidityData, '#00FF00', 0, 100, 'Humidité (%)')} />
      </Grid>
      <Grid item xs={6}>
        <HighchartsReact highcharts={Highcharts} options={options('CO2 over time', CO2Data, '#32CD32', 300, 1200, 'CO2 (ppm)')} />
      </Grid>
      <Grid item xs={6}>
        <HighchartsReact highcharts={Highcharts} options={options('TVOC over time', TVOCData, '#FFFF00', 0, 500, 'TVOC (mg/m3)')} />
      </Grid>
      <Grid item xs={6}>
        <HighchartsReact highcharts={Highcharts} options={options('Sound over time', soundData, '#DF5353', 20, 100, 'Son (dB)')} />
      </Grid>
      <Grid item xs={6}>
        <HighchartsReact highcharts={Highcharts} options={options('PM1.0 over time', PM1_0Data, '#8E44AD', 0, 500, 'PM1.0 (µg/m³)')} />
      </Grid>
      <Grid item xs={6}>
        <HighchartsReact highcharts={Highcharts} options={options('PM2.5 over time', PM2_5Data, '#16A085', 0, 500, 'PM2.5 (µg/m³)')} />
      </Grid>
      <Grid item xs={6}>
        <HighchartsReact highcharts={Highcharts} options={options('PM10 over time', PM10Data, '#F39C12', 0, 500, 'PM10 (µg/m³)')} />
      </Grid>
    </Grid>
  );
};

export default ChartSection;
