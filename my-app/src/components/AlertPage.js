import React from 'react';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';

const notificationStyles = {
  marginBottom: '20px',
  backgroundColor: '#2E2F45',
  color: '#EAEAEA', // Ajustement de la couleur pour plus de visibilité
  padding: '10px 20px',
  borderRadius: '10px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
};

const AlertPage = ({ alerts = [], onClearAlerts, onAlertClick }) => {
  return (
    <div style={{ padding: '20px', color: '#EAEAEA' }}>
      <Typography variant="h4" style={{ marginBottom: '20px', color: '#EAEAEA' }}>
        Alertes
      </Typography>

      {alerts.length === 0 ? (
        <Typography variant="h6">Aucune alerte pour le moment.</Typography>
      ) : (
        alerts.map((alert, index) => (
          <Card 
            key={index} 
            style={{ 
              ...notificationStyles, 
              border: alert.read ? '1px solid #555' : '1px solid #FF5733',
              cursor: 'pointer',
              backgroundColor: alert.read ? '#2E2F45' : '#3E3F5E'
            }}
            onClick={() => onAlertClick(index)}  // Marquer comme lu lorsqu'on clique
          >
            <CardContent>
              <Typography variant="h6" style={{ fontWeight: 'bold', color: '#EAEAEA' }}>
                {alert.title} 
              </Typography>
              <Typography variant="body2" style={{ marginTop: '10px' }}>
                {alert.message}
              </Typography>
              <Typography variant="body2" style={{ marginTop: '10px', fontStyle: 'italic', color: '#FF5733' }}>
                Valeur détectée: {alert.value} - {alert.recommendation}
              </Typography>
              <Typography variant="body2" style={{ marginTop: '10px', fontStyle: 'italic', color: '#FF5733' }}>
                Détecté le: {alert.timestamp}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}

      <Box style={{ marginTop: '20px' }}>
        <Button 
          onClick={onClearAlerts} 
          variant="contained" 
          style={{ 
            backgroundColor: '#FF5733', 
            color: '#fff', 
            fontWeight: 'bold', 
            borderRadius: '10px',
            padding: '10px 20px',
            transition: 'background-color 0.3s ease-in-out',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#FF4500'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#FF5733'}
        >
          Effacer les alertes
        </Button>
      </Box>
    </div>
  );
};

export default AlertPage;
