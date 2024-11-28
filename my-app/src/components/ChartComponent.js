// // components/ChartComponent.js
// import React from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

// const ChartComponent = ({ data, title, color }) => {
//   const options = {
//     chart: {
//       type: 'spline',  // Utiliser 'spline' pour lisser les courbes
//     },
//     title: {
//       text: title,
//     },
//     xAxis: {
//       type: 'datetime',  // Affichage des données en fonction du temps
//       title: {
//         text: 'Time',
//       },
//     },
//     yAxis: {
//       title: {
//         text: 'Values',
//       },
//       min: 0, 
//     },
//     series: [{
//       name: title,
//       data: data,
//       color: color,
//       lineWidth: 2,
//       marker: {
//         enabled: true,  // Afficher les points sur les courbes
//       },
//     }],
//   };

//   return <HighchartsReact highcharts={Highcharts} options={options} />;
// };

// export default ChartComponent;
