import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Grid, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

// Fonction pour normaliser les données
const normalizeData = (data, weightFactor) => {
  if (!data || data.length === 0) return [];
  return data.map(([timestamp, value]) => [timestamp, Math.min(value * weightFactor, 100)]);
};

// Options pour le graphique des données normalisées
const normalizedChartOptions = (visibleSeries, normalizedData) => {
  const todayDate = new Date();
  const today = todayDate.setHours(0, 0, 0, 0);

  return {
    chart: {
      type: 'spline',
      backgroundColor: '#2E2F45',
      height: 465,
      zoomType: 'x', // Permet de zoomer sur l'axe des x
      resetZoomButton: {
        position: {
          align: 'right', // Positionner à droite
          verticalAlign: 'top', // Positionner en haut
          x: -10,
          y: 10,
        },
        theme: {
          fill: '#fff',
          stroke: '#000',
          style: {
            color: '#000',
          },
          r: 5,
          states: {
            hover: {
              fill: '#f7f7f7',
              style: {
                color: '#333',
              },
            },
          },
        },
      },
    },
    title: {
      text: 'Normalized Data Visualization',
      style: { color: '#fff' },
      align: 'center',
    },
    xAxis: {
      type: 'datetime',
      gridLineWidth: 1,
      gridLineColor: '#fff',
      title: { text: 'Time', style: { color: '#fff' } },
      labels: { style: { color: '#fff' }, format: '{value:%H:%M}' },
      min: today,
      max: today + 24 * 3600 * 1000,
    },
    yAxis: {
      title: { text: 'Normalized Values (0-100)', style: { color: '#fff' } },
      gridLineWidth: 1,
      gridLineColor: '#fff',
      labels: { style: { color: '#fff' } },
      min: 0,
      max: 100,
      plotBands: [
        {
          from: 0,
          to: 33,
          color: 'rgba(0, 255, 0, 0.1)', // Vert clair
          label: {
            text: 'Safe Zone',
            style: { color: '#00FF00' },
          },
        },
        {
          from: 33,
          to: 66,
          color: 'rgba(255, 165, 0, 0.1)', // Orange clair
          label: {
            text: 'Monitoring Zone',
            style: { color: '#FFA500' },
          },
        },
        {
          from: 66,
          to: 100,
          color: 'rgba(255, 0, 0, 0.1)', // Rouge clair
          label: {
            text: 'Danger Zone',
            style: { color: '#FF0000' },
          },
        },
      ],
    },
    tooltip: {
      shared: true,
      valueDecimals: 2,
    },
    series: Object.keys(visibleSeries)
      .filter((key) => visibleSeries[key]) // Filtrer les séries visibles
      .map((key) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        data: normalizedData[key] || [],
        color: {
          temperature: '#FF0000',
          humidity: '#00FF00',
          CO2: '#0000FF',
          TVOC: '#FFFF00',
          sound: '#00000F',
          PM1_0: '#8E44AD',
          PM2_5: '#16A085',
          PM10: '#F39C12',
        }[key],
      })),
  };
};

const NormalizedChart = ({
  temperatureData,
  humidityData,
  CO2Data,
  TVOCData,
  soundData,
  PM1_0Data,
  PM2_5Data,
  PM10Data,
}) => {
  const [visibleSeries, setVisibleSeries] = useState({
    temperature: true,
    humidity: true,
    CO2: true,
    TVOC: true,
    sound: true,
    PM1_0: true,
    PM2_5: true,
    PM10: true,
  });

  // Normalisation des données
  const normalizedData = {
    temperature: normalizeData(temperatureData, 1), //valeur de pondération à modifier 
    humidity: normalizeData(humidityData, 1),
    CO2: normalizeData(CO2Data, 0.1),
    TVOC: normalizeData(TVOCData, 0.04),
    sound: normalizeData(soundData, 0.66),
    PM1_0: normalizeData(PM1_0Data, 0.4),
    PM2_5: normalizeData(PM2_5Data, 0.4),
    PM10: normalizeData(PM10Data, 0.4),
  };

  // Gestion des checkboxes
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setVisibleSeries((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <Grid container spacing={3} style={{ marginTop: 20 }}>
      {/* Graphique normalisé */}
      <Grid item xs={10}>
        <HighchartsReact
          highcharts={Highcharts}
          options={normalizedChartOptions(visibleSeries, normalizedData)}
        />
      </Grid>

      {/* Checkboxes pour afficher/masquer les séries */}
      {/* <Grid item xs={2}>
        <FormGroup
          style={{
            marginLeft: '20px',
            padding: '30px',
            backgroundColor: '#2E2F45',
            borderRadius: '8px',
          }}
        > */}
        {/* Checkboxes pour le graphique combiné à droite du graphique */}
        <Grid item xs={2}>
          <FormGroup
            style={{
              padding: '30px',
              backgroundColor: '#2E2F45',
              borderRadius: '8px',
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
                  style={{ color: '#fff' }}
                />
              }
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              style={{
                color: '#fff',
                marginBottom: '8px',
                width: 'auto',
              }}
            />
          ))}
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default NormalizedChart;


