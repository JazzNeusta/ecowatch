// components/ChartComponent.js
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ChartComponent = ({ data, title, color }) => {
  const options = {
    chart: {
      type: 'line',
    },
    title: {
      text: title,
    },
    series: [{
      name: title,
      data: data,
      color: color
    }],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ChartComponent;
