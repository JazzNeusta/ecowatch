// // components/ChartSection.js
// import React from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import { Grid } from '@mui/material';

// // Fonction pour calculer l'échelle dynamique (min, max) avec une marge
// const calculateMinMax = (data) => {
//   if (!data || data.length === 0) return [0, 1]; // Valeur par défaut si pas de données
//   const values = data.map(d => d[1]);
//   const min = Math.min(...values);
//   const max = Math.max(...values);
//   const margin = (max - min) * 0.1;  // Marge de 10% autour des données
//   return [min - margin, max + margin];
// };

// const ChartSection = ({ temperatureData, humidityData, humidexdata, CO2Data, TVOCData, soundData, PM1_0Data, PM2_5Data, PM10Data,
//   startDate, endDate }) => {
  
//     const options = (title, data, color) => {
//       return {
//         chart: {
//           type: 'spline', // Smoothed line chart
//           backgroundColor: '#2E2F45',
//           height: 300,
//         },
//         title: {
//           text: title,
//           style: { color: '#fff' },
//         },
//         xAxis: {
//           type: 'datetime',
//           title: {
//             text: 'Time (Minutes)',
//             style: { color: '#fff' },
//           },
//           min: 0, // Start at 0
//           max: 10 * 60 * 1000, // 10 minutes in milliseconds
//           labels: {
//             formatter: function () {
//               return `${Math.round(this.value / 60000)} min`; // Convert milliseconds to minutes
//             },
//             style: { color: '#fff' },
//           },
//           gridLineWidth: 1, // Add vertical grid lines
//         },
//         yAxis: {
//           title: {
//             text: 'Values',
//             style: { color: '#fff' },
//           },
//           min: 0, // Set minimum to 0
//           max: 100, // Set maximum to 100
//           tickInterval: 10, // Optional: Add ticks every 10 units
//           gridLineWidth: 1, // Add horizontal grid lines
//           labels: {
//             style: { color: '#fff' },
//           },
//         },
//         plotOptions: {
//           series: {
//             marker: {
//               enabled: true,
//               radius: 3, // Size of data points
//             },
//           },
//         },
//         series: [
//           {
//             data: data,
//             color: color,
//             lineWidth: 2,
//             marker: {
//               radius: 3, // Size of markers
//             },
//           },
//         ],
//       };
//     };

//   return (
//     <Grid container spacing={3} style={{ marginTop: 20 }}>
//       <Grid item xs={6}>
//         <HighchartsReact highcharts={Highcharts} options={options('Temperature over time', temperatureData, '#FF5733')} />
//       </Grid>
//       <Grid item xs={6}>
//         <HighchartsReact highcharts={Highcharts} options={options('Humidity over time', humidityData, '#28B463')} />
//       </Grid>
//       <Grid item xs={6}>
//       <HighchartsReact highcharts={Highcharts} options={options('Humidex over time', humidexdata, '#E5A00C')} />
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



// components/ChartSection.js
// import React from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

// // Fonction pour vérifier si les données sont valides
// const validateData = (data) => (data && data.length ? data : []);

// // Options pour un graphique combiné
// const ChartSection = ({
//   temperatureData,
//   humidityData,
//   humidexData,
//   CO2Data,
//   TVOCData,
//   soundData,
//   PM1_0Data,
//   PM2_5Data,
//   PM10Data,
// }) => {
//   const combinedChartOptions = {
//     chart: {
//       type: 'line',
//       backgroundColor: '#2E2F45',
//       height: 500,
//     },
//     title: {
//       text: 'Combined Sensor Data',
//       style: { color: '#fff' },
//     },
//     xAxis: {
//       type: 'datetime',
//       title: { text: 'Time', style: { color: '#fff' } },
//       labels: { style: { color: '#fff' } },
//     },
//     yAxis: {
//       title: { text: 'Values', style: { color: '#fff' } },
//       labels: { style: { color: '#fff' } },
//     },
//     series: [
//       {
//         name: 'Temperature',
//         data: validateData(temperatureData),
//         color: '#FF5733',
//       },
//       {
//         name: 'Humidity',
//         data: validateData(humidityData),
//         color: '#28B463',
//       },
//       {
//         name: 'Humidex',
//         data: validateData(humidexData),
//         color: '#E5A00C',
//       },
//       {
//         name: 'CO2',
//         data: validateData(CO2Data),
//         color: '#2ECC71',
//       },
//       {
//         name: 'TVOC',
//         data: validateData(TVOCData),
//         color: '#F4D03F',
//       },
//       {
//         name: 'Sound',
//         data: validateData(soundData),
//         color: '#E74C3C',
//       },
//       {
//         name: 'PM1.0',
//         data: validateData(PM1_0Data),
//         color: '#8E44AD',
//       },
//       {
//         name: 'PM2.5',
//         data: validateData(PM2_5Data),
//         color: '#16A085',
//       },
//       {
//         name: 'PM10',
//         data: validateData(PM10Data),
//         color: '#F39C12',
//       },
//     ],
//   };

//   return (
//     <div style={{ marginTop: 20 }}>
//       <HighchartsReact highcharts={Highcharts} options={combinedChartOptions} />
//     </div>
//   );
// };

// export default ChartSection;




//Third version of ChartSection.js
// components/ChartSection.js
import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FormGroup, FormControlLabel, Checkbox, Grid } from '@mui/material';

// Fonction pour vérifier si les données sont valides
const validateData = (data) => (data && data.length ? data : []);

const ChartSection = ({
  temperatureData,
  humidityData,
  humidexData,
  CO2Data,
  TVOCData,
  soundData,
  PM1_0Data,
  PM2_5Data,
  PM10Data,
}) => {
  // État pour gérer la visibilité des séries
  const [visibleSeries, setVisibleSeries] = useState({
    temperature: true,
    humidity: true,
    humidex: true,
    CO2: true,
    TVOC: true,
    sound: true,
    PM1_0: true,
    PM2_5: true,
    PM10: true,
  });

  // Options du graphique combiné
  const combinedChartOptions = {
    chart: {
      type: 'line',
      backgroundColor: '#2E2F45',
      height: 500,
    },
    title: {
      text: 'Combined Sensor Data',
      style: { color: '#fff' },
    },
    xAxis: {
      type: 'datetime',
      title: { text: 'Time', style: { color: '#fff' } },
      labels: { style: { color: '#fff' } },
    },
    yAxis: {
      title: { text: 'Values', style: { color: '#fff' } },
      labels: { style: { color: '#fff' } },
    },
    series: [
      {
        name: 'Temperature',
        data: validateData(temperatureData),
        color: '#FF0000',
        visible: visibleSeries.temperature,
      },
      {
        name: 'Humidity',
        data: validateData(humidityData),
        color: '#00FF00',
        visible: visibleSeries.humidity,
      },
      {
        name: 'Humidex',
        data: validateData(humidexData),  //Pensons à enlever l'humidex de la liste des données car elle sera intégrée dans un autre graphique
        color: '#E5A00C',
        visible: visibleSeries.humidex,
      },
      {
        name: 'CO2',
        data: validateData(CO2Data),
        color: '#0000FF',
        visible: visibleSeries.CO2,
      },
      {
        name: 'TVOC',
        data: validateData(TVOCData),
        color: '#FFFF00',
        visible: visibleSeries.TVOC,
      },
      {
        name: 'Sound',
        data: validateData(soundData),
        color: '#DF5353',
        visible: visibleSeries.sound,
      },
      {
        name: 'PM1.0',
        data: validateData(PM1_0Data),
        color: '#8E44AD',
        visible: visibleSeries.PM1_0,
      },
      {
        name: 'PM2.5',
        data: validateData(PM2_5Data),
        color: '#16A085',
        visible: visibleSeries.PM2_5,
      },
      {
        name: 'PM10',
        data: validateData(PM10Data),
        color: '#F39C12',
        visible: visibleSeries.PM10,
      },
    ],
  };

  // Gestion des cases à cocher
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setVisibleSeries((prev) => ({ ...prev, [name]: checked }));
  };

  return (

    <Grid container spacing={3} style={{ marginTop: 20 }}>

      <Grid item xs={10}>
        <HighchartsReact highcharts={Highcharts} options={combinedChartOptions} />
      </Grid>
        <Grid item xs={2}>
          <FormGroup
            style={{
              marginLeft: '50px', // Décale les checkboxes vers la droite
              padding: '30px', // Ajoute un peu d'espace intérieur
              backgroundColor: '#2E2F45', // Optionnel, ajoute un fond pour démarquer
              borderRadius: 'px', // Bordures arrondies
            }}
          >
            {Object.keys(visibleSeries).map((key) => (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    checked={visibleSeries[key]}
                    onChange={handleCheckboxChange}
                    name={key}
                    style={{ color: '#fff' }} // Couleur des cases
                  />
                }
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                style={{
                  color: '#fff', // Couleur du texte
                  marginBottom: '8px', // Réduit l'espacement entre les lignes
                  width: 'auto', // Réduit la largeur des lignes
                }}
              />
            ))}
          </FormGroup>
        </Grid>
  </Grid>

  );
};

export default ChartSection;
