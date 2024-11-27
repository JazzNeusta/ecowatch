import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, CloudDownload, Settings, Notifications } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import Logo from '../assets/LogoECOWATCH360.png';

const Sidebar = ({ onMenuClick, currentMenu, alertCount }) => {
  const getMenuStyle = (menu) => ({
    backgroundColor: currentMenu === menu ? '#3E3F5E' : 'transparent',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  });

  return (
    <div style={{ width: 250, backgroundColor: '#2A2B3D', height: '100vh', padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <img src={Logo} alt="ECOWATCH 360 Logo" style={{ width: 40, height: 40, marginRight: 10 }} />
        <h2 style={{ color: '#fff' }}>ECOWATCH 360</h2>
      </div>
      <List>
        <ListItem button onClick={() => onMenuClick('dashboard')} style={getMenuStyle('dashboard')}>
          <ListItemIcon>
            <Dashboard style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" style={{ color: '#fff' }} />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('download')} style={getMenuStyle('download')}>
          <ListItemIcon>
            <CloudDownload style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Download Data" style={{ color: '#fff' }} />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('alerts')} style={getMenuStyle('alerts')}>
          <ListItemIcon>
            <Badge badgeContent={alertCount} color="error">
              <Notifications style={{ color: '#fff' }} />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Alerts" style={{ color: '#fff' }} />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('settings')} style={getMenuStyle('settings')}>
          <ListItemIcon>
            <Settings style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Informations" style={{ color: '#fff' }} />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
