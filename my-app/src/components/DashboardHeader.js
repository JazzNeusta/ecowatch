// Affiche les moyennes des données 
import React from 'react';
import { Grid } from '@mui/material';
import StatCard from './StatCard';
import { Thermostat, Opacity, Air, AcUnit, VolumeUp, FilterDrama } from '@mui/icons-material'; // Nouveaux icônes

const DashboardHeader = ({ temperatureAvg, humidityAvg, CO2Avg, TVOCAvg, soundAvg, PM1_0Avg, PM2_5Avg, PM10Avg }) => {
  const data = [
    {
      title: 'Temperature',
      value: `${temperatureAvg}°C`,
      change: { value: '+1.2°C', color: '#4CAF50' },
      icon: Thermostat,
      color: '#FF0000',
    },
    {
      title: 'Humidity',
      value: `${humidityAvg}%`,
      change: { value: '-3%', color: '#FF9800' },
      icon: Opacity,
      color: '#00FF00',
    },
    {
      title: 'CO2',
      value: `${CO2Avg} ppm`,
      change: { value: '+50 ppm', color: '#2196F3' },
      icon: Air,
      color: '#0000FF',
    },
    {
      title: 'TVOC',
      value: `${TVOCAvg} ppb`,
      change: { value: '0%', color: '#FFC107' },
      icon: AcUnit,
      color: '#FFFF00',
    },
    {
      title: 'Sound',
      value: `${soundAvg} dB`,
      change: { value: '+5 dB', color: '#F44336' },
      icon: VolumeUp,
      color: '#00000F',
    },
    {
      title: 'PM1.0',
      value: `${PM1_0Avg} µg/m3`,
      change: { value: '+1 µg/m3', color: '#8E44AD' },
      icon: FilterDrama,
      color: '#8E44AD',
    },
    {
      title: 'PM2.5',
      value: `${PM2_5Avg} µg/m3`,
      change: { value: '+2 µg/m3', color: '#16A085' },
      icon: FilterDrama,
      color: '#16A085',
    },
    {
      title: 'PM10',
      value: `${PM10Avg} µg/m3`,
      change: { value: '+3 µg/m3', color: '#F39C12' },
      icon: FilterDrama,
      color: '#F39C12',
    },
  ];

  return (
    <Grid container spacing={3} style={{ marginBottom: 20 }}>
      {data.map((stat, index) => (
        <Grid item xs={12} md={3} key={index}>
          <StatCard
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            color={stat.color}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardHeader;
