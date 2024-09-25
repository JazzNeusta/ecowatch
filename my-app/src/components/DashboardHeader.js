// components/DashboardHeader.js
import React from 'react';
import { Grid } from '@mui/material';
import StatCard from './StatCard';
import { Thermostat, Opacity, Air, AcUnit, VolumeUp } from '@mui/icons-material';

const data = [
  {
    title: 'Temperature',
    value: '23.5°C',
    change: { value: '+1.2°C', color: '#4CAF50' },
    icon: Thermostat,
    color: '#FF0000',
  },
  {
    title: 'Humidity',
    value: '45%',
    change: { value: '-3%', color: '#FF9800' },
    icon: Opacity,
    color: '#00FF00',
  },
  {
    title: 'CO2',
    value: '400 ppm',
    change: { value: '+50 ppm', color: '#2196F3' },
    icon: Air,
    color: '#0000FF',
  },
  {
    title: 'TVOC',
    value: '0.5 mg/m3',
    change: { value: '0%', color: '#FFC107' },
    icon: AcUnit,
    color: '#FFFF00',
  },
  {
    title: 'Sound',
    value: '60 dB',
    change: { value: '+5 dB', color: '#F44336' },
    icon: VolumeUp,
    color: '#DF5353',
  },
];

const DashboardHeader = () => {
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
