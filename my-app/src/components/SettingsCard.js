// afficher les paramètres de l'application.
import React from 'react';
import { Card, CardContent, Typography, Divider, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Settings, Info, Code, Cloud, BarChart, GitHub, Storage, GridOn } from '@mui/icons-material';

const SettingsCard = () => {
  return (
    <Card style={{ maxWidth: 700, margin: '20px auto', backgroundColor: '#2E2F45', color: '#fff', borderRadius: '15px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)' }}>
      <CardContent>
        <Box style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
          <Settings style={{ fontSize: 40, marginRight: 10, color: '#FF9800' }} />
          <Typography variant="h5" style={{ fontWeight: 'bold', color: '#FF9800' }}>
            Application Settings
          </Typography>
        </Box>
        
        <Divider style={{ backgroundColor: '#FF9800', marginBottom: 20 }} />

        <List>
          <ListItem>
            <ListItemIcon>
              <Info style={{ color: '#4CAF50' }} />
            </ListItemIcon>
            <ListItemText primary="ECOWATCH 360 - Version 1.0" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Code style={{ color: '#2196F3' }} />
            </ListItemIcon>
            <ListItemText primary="Frontend Framework: React" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <GridOn style={{ color: '#FFC107' }} />
            </ListItemIcon>
            <ListItemText primary="JavaScript Libraries: Highcharts, Material-UI, Axios" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <GitHub style={{ color: '#E91E63' }} />
            </ListItemIcon>
            <ListItemText primary="Version Control: Git" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Storage style={{ color: '#9C27B0' }} />
            </ListItemIcon>
            <ListItemText primary="Package Manager: npm" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Cloud style={{ color: '#00BCD4' }} />
            </ListItemIcon>
            <ListItemText primary="AWS Services: S3, Lambda, DynamoDB..." />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <BarChart style={{ color: '#673AB7' }} />
            </ListItemIcon>
            <ListItemText primary="Data Visualization: Highcharts" />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <GridOn style={{ color: '#FF5722' }} />
            </ListItemIcon>
            <ListItemText primary="CSS Framework: Material-UI" />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default SettingsCard;
