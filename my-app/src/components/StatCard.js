// components/StatCard.js
import React from 'react';
import { Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Card pour éviter la couleur blanche
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#2E2F45', // Couleur de fond foncée
  color: '#fff', // Couleur du texte blanche
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 16,
  boxShadow: 'none', // Supprimez les ombres si nécessaire
}));

const StatCard = ({ title, value, change, icon: IconComponent, color }) => {
  return (
    <StyledCard>
      <IconComponent style={{ fontSize: 40, color: color }} />
      <div style={{ textAlign: 'right' }}>
        <Typography variant="h6" style={{ color: '#fff' }}>{title}</Typography>
        <Typography variant="h4" style={{ fontWeight: 'bold', color: '#fff' }}>
          {value}
        </Typography>
        <Typography variant="subtitle1" style={{ color: change.color }}>
          {change.value}
        </Typography>
      </div>
    </StyledCard>
  );
};

export default StatCard;
