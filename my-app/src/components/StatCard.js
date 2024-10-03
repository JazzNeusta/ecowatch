import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Card pour éviter la couleur blanche
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#2E2F45', // Couleur de fond foncée
  color: '#fff', // Couleur du texte blanche
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 16,
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Ajoute une légère ombre pour la profondeur
  borderRadius: '12px', // Bords légèrement arrondis
  transition: 'all 0.3s ease-in-out', // Effet de transition pour le hover
  '&:hover': {
    transform: 'scale(1.05)', // Effet de survol pour agrandir légèrement la carte
  },
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
