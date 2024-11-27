// import React from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import { Grid } from '@mui/material';

// // Fonction pour filtrer les données et ne conserver qu'un point par minute
// const filterDataPerMinute = (data) => {
//   if (!data || data.length === 0) return [];
  
//   let lastMinuteTimestamp = 0;
//   return data.filter(([timestamp]) => {
//     const currentMinute = Math.floor(timestamp / 1000); // Obtenir la minute actuelle
//     if (currentMinute !== lastMinuteTimestamp) {
//       lastMinuteTimestamp = currentMinute;
//       return true;
//     }
//     return false;
//   });
// };

// const ChartSection = ({ temperatureData, humidityData, humidexData, CO2Data, TVOCData, soundData, PM1_0Data, PM2_5Data, PM10Data,
//   startDate, endDate }) => {

//   const options = (title, data, color, isHumidex = false) => {
//     const todayDate = new Date();
//     const today = todayDate.setHours(0, 0, 0, 0); // Fixer l'heure de début à minuit aujourd'hui

//     // Calculer le dernier timestamp des données disponibles
//     const filteredData = filterDataPerMinute(data);
//     const lastTimestamp = filteredData.length > 0 ? filteredData[filteredData.length - 1][0] : null;

//     return {
//       chart: {
//         type: 'spline',
//         backgroundColor: '#2E2F45',
//         height: 300,
//       },
//       title: {
//         text: title,
//         style: { color: '#fff' },
//         align: 'left',
//       },
//       xAxis: {
//         type: 'datetime',
//         gridLineWidth: 1,
//         min: today,  // Début de la journée (minuit)
//         max: today + 24 * 3600 * 1000, // Fin de la journée (24 heures plus tard)
//         tickInterval: 2 * 3600 * 1000, // Intervalle de 2 heures
//         plotLines: isHumidex && lastTimestamp ? [{
//           color: '#4840d6',
//           width: 2,
//           value: lastTimestamp, // Aligner la barre verticale sur le dernier point
//           zIndex: 2,
//           dashStyle: 'Dash',
//           label: {
//             text: 'Last Data Point',
//             rotation: 0,
//             y: 20,
//             style: {
//               color: '#fff'
//             }
//           }
//         }] : [],
//         title: { text: 'Time', style: { color: '#fff' } },
//         labels: {
//           style: { color: '#fff' },
//           format: '{value:%H:%M}', // Format pour afficher heures et minutes
//         },
//       },
//       yAxis: {
//         min: 0,
//         max: 100,
//         tickInterval: 10, // Graduation fixe de 10 unités entre chaque ligne
//         title: { text: 'Values', style: { color: '#fff' } },
//         labels: {
//           style: { color: '#fff' },
//         },
//       },
//       legend: {
//         enabled: false
//       },
//       tooltip: {
//         valueDecimals: 2
//       },
//       series: [
//         {
//           name: title,
//           data: filteredData || [], // Filtrer les données pour un point par minute
//           lineWidth: 4,
//           marker: {
//             lineWidth: 2,
//             lineColor: '#4840d6',
//             fillColor: '#fff',
//             enabled: true, // Assurer que les points sont visibles
//             radius: 4
//           },
//           color: isHumidex ? {
//             linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
//             stops: [
//               [0, '#fa4fed'],
//               [1, '#5897ff']
//             ]
//           } : color,
//           zoneAxis: 'x',
//           zones: isHumidex ? [
//             { value: lastTimestamp },
//             { dashStyle: 'Dot' }
//           ] : []
//         },
//       ],
//     };
//   };

//   return (
//     <Grid container spacing={3} style={{ marginTop: 20 }}>
//       <Grid item xs={6}>
//         <HighchartsReact highcharts={Highcharts} options={options('Temperature over time', temperatureData, '#FF5733')} />
//       </Grid>
//       <Grid item xs={6}>
//         <HighchartsReact highcharts={Highcharts} options={options('Humidity over time', humidityData, '#28B463')} />
//       </Grid>
//       <Grid item xs={6}>
//         <HighchartsReact highcharts={Highcharts} options={options('Humidex over time', humidexData, null, true)} />
//       </Grid>
//       <Grid item xs={6}>
//         <HighchartsReact highcharts={Highcharts} options={options('CO2 over time', CO2Data, '#2ECC71')} />
//       </Grid>
//       <Grid item xs={6}>
//         <HighchartsReact highcharts={Highcharts} options={options('TVOC over time', TVOCData, '#F4D03F')} />
//       </Grid>
//       <Grid item xs={6}>
//         <HighchartsReact highcharts={Highcharts} options={options('Sound over time', soundData, '#E74C3C')} />
//       </Grid>
//       <Grid item xs={6}>
//         <HighchartsReact highcharts={Highcharts} options={options('PM1.0 over time', PM1_0Data, '#8E44AD')} />
//       </Grid>
//       <Grid item xs={6}>
//         <HighchartsReact highcharts={Highcharts} options={options('PM2.5 over time', PM2_5Data, '#16A085')} />
//       </Grid>
//       <Grid item xs={6}>
//         <HighchartsReact highcharts={Highcharts} options={options('PM10 over time', PM10Data, '#F39C12')} />
//       </Grid>
//     </Grid>
//   );
// };

// export default ChartSection;