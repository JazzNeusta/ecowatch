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


// // components/ChartSection.js
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Grid } from '@mui/material';

// Fonction pour calculer l'échelle dynamique (min, max) avec une marge
const calculateMinMax = (data) => {
  if (!data || data.length === 0) return [0, 1]; // Valeur par défaut si pas de données
  const values = data.map(d => d[1]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const margin = (max - min) * 0.1;  // Marge de 10% autour des données
  return [min - margin, max + margin];
};

const ChartSection = ({ temperatureData, humidityData, CO2Data, TVOCData, soundData, PM1_0Data, PM2_5Data, PM10Data }) => {
  
  const options = (title, data, color) => {
    const [min, max] = calculateMinMax(data); // Calcul dynamique de l'échelle
    return {
      chart: {
        type: 'spline',  // Courbe lissée
        backgroundColor: '#2E2F45',
        height: 300, // Hauteur ajustée
      },
      title: {
        text: title,
        style: { color: '#fff' },
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Time',
          style: { color: '#fff' },
        },
      },
      yAxis: {
        title: {
          text: 'Values',
          style: { color: '#fff' },
        },
        min: min,
        max: max,
      },
      plotOptions: {
        series: {
          marker: {
            enabled: true,
            radius: 3, // Taille des marqueurs
          },
        },
      },
      series: [{
        data: data,
        color: color,
        lineWidth: 2,
        marker: {
          radius: 3,  // Taille des points
        },
      }],
    };
  };

  return (
    <Grid container spacing={3} style={{ marginTop: 20 }}>
      <Grid item xs={6}>
        <HighchartsReact highcharts={Highcharts} options={options('Temperature over time', temperatureData, '#FF5733')} />
      </Grid>
      <Grid item xs={6}>
        <HighchartsReact highcharts={Highcharts} options={options('Humidity over time', humidityData, '#28B463')} />
      </Grid>
      <Grid item xs={6}>
        <HighchartsReact highcharts={Highcharts} options={options('CO2 over time', CO2Data, '#2ECC71')} />
      </Grid>
      <Grid item xs={6}>
        <HighchartsReact highcharts={Highcharts} options={options('TVOC over time', TVOCData, '#F4D03F')} />
      </Grid>
      <Grid item xs={6}>
        <HighchartsReact highcharts={Highcharts} options={options('Sound over time', soundData, '#E74C3C')} />
      </Grid>
      <Grid item xs={6}>
        <HighchartsReact highcharts={Highcharts} options={options('PM1.0 over time', PM1_0Data, '#8E44AD')} />
      </Grid>
      <Grid item xs={6}>
        <HighchartsReact highcharts={Highcharts} options={options('PM2.5 over time', PM2_5Data, '#16A085')} />
      </Grid>
      <Grid item xs={6}>
        <HighchartsReact highcharts={Highcharts} options={options('PM10 over time', PM10Data, '#F39C12')} />
      </Grid>
    </Grid>
  );
};

export default ChartSection;
