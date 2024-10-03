import React from 'react';
import { Grid, Typography } from '@mui/material';
import StatCard from './StatCard';
import { Thermostat, Opacity, Air, AcUnit, VolumeUp } from '@mui/icons-material';

const DashboardHeader = ({ temperatureAvg, humidityAvg, CO2Avg, TVOCAvg, soundAvg }) => {
  // Données dynamiques à afficher dans les cartes de statistiques
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
      value: `${TVOCAvg} mg/m3`,
      change: { value: '0%', color: '#FFC107' },
      icon: AcUnit,
      color: '#FFFF00',
    },
    {
      title: 'Sound',
      value: `${soundAvg} dB`,
      change: { value: '+5 dB', color: '#F44336' },
      icon: VolumeUp,
      color: '#DF5353',
    },
  ];

  return (
    <Grid container spacing={3} style={{ marginBottom: 20 }}>
      {data.map((stat, index) => (
        <Grid 
          item 
          xs={12} sm={6} md={3} 
          key={index}
          style={{
            transition: 'transform 0.3s ease-in-out', 
            '&:hover': { transform: 'scale(1.05)' } // Effet de survol
          }}
        >
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
