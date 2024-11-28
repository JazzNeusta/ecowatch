import React, { useState, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Grid, FormControlLabel, Checkbox, FormGroup } from '@mui/material';

// Fonction pour filtrer les données à un point par minute
const filterDataPerMinute = (data) => {
  if (!data || data.length === 0) return [];
  const filtered = [];
  const seenMinutes = new Set();

  for (const [timestamp, value] of data) {
    const date = new Date(timestamp);
    const minute = date.getMinutes();
    if (!seenMinutes.has(minute)) {
      filtered.push([timestamp, value]);
      seenMinutes.add(minute);
    }
  }
  return filtered;
};

const ChartSection = ({
  temperatureData,
  humidityData,
  CO2Data,
  TVOCData,
  soundData,
  PM1_0Data,
  PM2_5Data,
  PM10Data,
  humidexData,
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

  const chartRefCombined = useRef(null);
  const chartRefHumidex = useRef(null);

  // Fonction pour déterminer les min et max de l'axe X (5 minutes avant et après les données)
  const calculateXAxisExtremes = (data) => {
    if (!data || data.length === 0) return [null, null];
    const timestamps = data.map((d) => d[0]);
    const minTimestamp = Math.min(...timestamps) - 2 * 60 * 1000; // 2 minutes avant
    const maxTimestamp = Math.max(...timestamps) + 2 * 60 * 1000; // 2 minutes après
    return [minTimestamp, maxTimestamp];
  };

  // Calculer les limites de l'axe X pour les deux graphiques
  const [combinedMin, combinedMax] = calculateXAxisExtremes([
    ...temperatureData,
    ...humidityData,
    ...CO2Data,
    ...TVOCData,
    ...soundData,
    ...PM1_0Data,
    ...PM2_5Data,
    ...PM10Data,
  ]);

  const [humidexMin, humidexMax] = calculateXAxisExtremes(humidexData);

  // Gestion des checkboxes
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setVisibleSeries((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <Grid container spacing={3} style={{ marginTop: 20 }}>
      {/* Graphique combiné avec checkboxes */}
      <Grid item xs={10}>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
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
              text: 'Combined Data',
              style: { color: '#fff' },
              align: 'center',
            },
            xAxis: {
              type: 'datetime',
              gridLineWidth: 1,
              gridLineColor: '#fff',
              title: { text: 'Time', style: { color: '#fff' } },
              labels: { style: { color: '#fff' }, format: '{value:%H:%M}' },
              min: combinedMin,
              max: combinedMax,
            },
            yAxis: {
              title: { text: 'Values', style: { color: '#fff' } },
              gridLineWidth: 1,
              gridLineColor: '#fff',
              labels: { style: { color: '#fff' } },
              min: 0,
            },
            series: [
              visibleSeries.temperature && { name: 'Temperature', data: filterDataPerMinute(temperatureData), color: '#FF0000' },
              visibleSeries.humidity && { name: 'Humidity', data: filterDataPerMinute(humidityData), color: '#00FF00' },
              visibleSeries.CO2 && { name: 'CO2', data: filterDataPerMinute(CO2Data), color: '#0000FF' },
              visibleSeries.TVOC && { name: 'TVOC', data: filterDataPerMinute(TVOCData), color: '#FFFF00' },
              visibleSeries.sound && { name: 'Sound', data: filterDataPerMinute(soundData), color: '#00000F' },
              visibleSeries.PM1_0 && { name: 'PM1.0', data: filterDataPerMinute(PM1_0Data), color: '#8E44AD' },
              visibleSeries.PM2_5 && { name: 'PM2.5', data: filterDataPerMinute(PM2_5Data), color: '#16A085' },
              visibleSeries.PM10 && { name: 'PM10', data: filterDataPerMinute(PM10Data), color: '#F39C12' },
            ].filter(Boolean),
            tooltip: {
              shared: true,
              valueDecimals: 2,
            },
          }}
          ref={chartRefCombined}
        />
      </Grid>

      {/* Graphique de l'humidex */}
      <Grid item xs={10} style={{ marginTop: '20px' }}>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            chart: {
              type: 'spline',
              backgroundColor: '#2E2F45',
              height: 400,
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
              text: 'Humidex Over Time',
              style: { color: '#fff' },
              align: 'center',
            },
            xAxis: {
              type: 'datetime',
              gridLineWidth: 1,
              gridLineColor: '#fff',
              title: { text: 'Time', style: { color: '#fff' } },
              labels: { style: { color: '#fff' }, format: '{value:%H:%M}' },
              min: humidexMin,
              max: humidexMax,
            },
            yAxis: {
              min: 0,
              max: 100,
              tickInterval: 10,
              title: { text: 'Values', style: { color: '#fff' } },
              labels: { style: { color: '#fff' } },
            },
            series: [
              {
                name: 'Humidex',
                data: filterDataPerMinute(humidexData),
                lineWidth: 4,
                marker: {
                  lineWidth: 2,
                  lineColor: '#4840d6',
                  fillColor: '#fff',
                  enabled: true,
                  radius: 4,
                },
                color: {
                  linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                  stops: [
                    [0, '#fa4fed'],
                    [1, '#5897ff'],
                  ],
                },
              },
            ],
            tooltip: {
              shared: true,
              valueDecimals: 2,
            },
          }}
          ref={chartRefHumidex}
        />
      </Grid>

      {/* Checkboxes pour le graphique combiné */}
      <Grid item xs={2}>
        <FormGroup
          style={{
            marginLeft: '50px',
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

export default ChartSection;