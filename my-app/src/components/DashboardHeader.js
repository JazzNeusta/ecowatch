// components/DashboardHeader.js
import React from 'react';
import { Grid } from '@mui/material';
import StatCard from './StatCard';
import { Thermostat, Opacity, Air, AcUnit, VolumeUp } from '@mui/icons-material';

const DashboardHeader = ({ temperatureAvg, humidityAvg, CO2Avg, TVOCAvg, soundAvg }) => {
  // Les données dynamiques à afficher dans les cartes de statistiques
  const data = [
    {
      title: 'Temperature',
      value: `${temperatureAvg}°C`,  // Température dynamique
      change: { value: '+1.2°C', color: '#4CAF50' },  
      icon: Thermostat,
      color: '#FF0000',
    },
    {
      title: 'Humidity',
      value: `${humidityAvg}%`,  // Humidité dynamique
      change: { value: '-3%', color: '#FF9800' },
      icon: Opacity,
      color: '#00FF00',
    },
    {
      title: 'CO2',
      value: `${CO2Avg} ppm`,  // CO2 dynamique
      change: { value: '+50 ppm', color: '#2196F3' },
      icon: Air,
      color: '#0000FF',
    },
    {
      title: 'TVOC',
      value: `${TVOCAvg} mg/m3`,  // TVOC dynamique
      change: { value: '0%', color: '#FFC107' },
      icon: AcUnit,
      color: '#FFFF00',
    },
    {
      title: 'Sound',
      value: `${soundAvg} dB`,  // Son dynamique
      change: { value: '+5 dB', color: '#F44336' },
      icon: VolumeUp,
      color: '#DF5353',
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
