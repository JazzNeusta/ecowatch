// components/ChartSection.js
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Grid } from '@mui/material';

const ChartSection = ({ temperatureData, humidityData, CO2Data, TVOCData, soundData }) => {
  const options = (title, data, color) => ({
    chart: {
      type: 'line',
      backgroundColor: '#2E2F45',
    },
    title: {
      text: title,
      style: { color: '#fff' },
    },
    series: [{ data, color }],
  });

  return (
    <Grid container spacing={3} style={{ marginTop: 20 }}>
      <Grid item xs={6}>
        <HighchartsReact highcharts={Highcharts} options={options('Temperature over time', temperatureData, '#FF0000')} />
      </Grid>
      <Grid item xs={6}>
        <HighchartsReact highcharts={Highcharts} options={options('Humidity over time', humidityData, '#00FF00')} />
      </Grid>
      <Grid item xs={6}>
        <HighchartsReact highcharts={Highcharts} options={options('CO2 over time', CO2Data, '#0000FF')} />
      </Grid>
      <Grid item xs={6}>
        <HighchartsReact highcharts={Highcharts} options={options('TVOC over time', TVOCData, '#FFFF00')} />
      </Grid>
      <Grid item xs={12}>
        <HighchartsReact highcharts={Highcharts} options={options('Sound over time', soundData, '#DF5353')} />
      </Grid>
    </Grid>
  );
};

export default ChartSection;
