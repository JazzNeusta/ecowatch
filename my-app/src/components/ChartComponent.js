// // components/ChartComponent.js
// import React from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

// const ChartComponent = ({ data, title, color }) => {
//   const options = {
//     chart: {
//       type: 'line',
//     },
//     title: {
//       text: title,
//     },
//     series: [{
//       name: title,
//       data: data,
//       color: color
//     }],
//   };

//   return <HighchartsReact highcharts={Highcharts} options={options} />;
// };

// export default ChartComponent;

// components/ChartComponent.js
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ChartComponent = ({ data, title, color }) => {
  const options = {
    chart: {
      type: 'spline',  // Utiliser 'spline' pour lisser les courbes
    },
    title: {
      text: title,
    },
    xAxis: {
      type: 'datetime',  // Affichage des données en fonction du temps
      title: {
        text: 'Time',
      },
    },
    yAxis: {
      title: {
        text: 'Values',
      },
      min: 0,  // Ajuster les limites selon les données si nécessaire
    },
    series: [{
      name: title,
      data: data,
      color: color,
      lineWidth: 2,
      marker: {
        enabled: true,  // Afficher les points sur les courbes
      },
    }],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ChartComponent;
