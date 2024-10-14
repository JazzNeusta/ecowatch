//Une barre latérale pour la navigation dans le menu.
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, CloudDownload, Settings } from '@mui/icons-material';
import Logo from '../assets/LogoECOWATCH360.png';

const Sidebar = ({ onMenuClick, currentMenu }) => {
  const getMenuStyle = (menu) => ({
    backgroundColor: currentMenu === menu ? '#3E3F5E' : 'transparent',  // Changement de couleur si sélectionné
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',  // Effet de transition lors de la sélection
  });

  const getHoverStyle = {
    '&:hover': {
      backgroundColor: '#484A6C',  // Couleur lors du survol
    },
  };

  return (
    <div style={{ width: 250, backgroundColor: '#2A2B3D', height: '100vh', padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <img src={Logo} alt="ECOWATCH 360 Logo" style={{ width: 40, height: 40, marginRight: 10 }} />
        <h2 style={{ color: '#fff' }}>ECOWATCH 360</h2>
      </div>
      <List>
        <ListItem
          button
          onClick={() => onMenuClick('dashboard')}
          style={{ ...getMenuStyle('dashboard'), ...getHoverStyle }}
        >
          <ListItemIcon>
            <Dashboard style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" style={{ color: '#fff' }} />
        </ListItem>

        <ListItem
          button
          onClick={() => onMenuClick('download')}
          style={{ ...getMenuStyle('download'), ...getHoverStyle }}
        >
          <ListItemIcon>
            <CloudDownload style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Download Data" style={{ color: '#fff' }} />
        </ListItem>

        <ListItem
          button
          onClick={() => onMenuClick('settings')}
          style={{ ...getMenuStyle('settings'), ...getHoverStyle }}
        >
          <ListItemIcon>
            <Settings style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Settings" style={{ color: '#fff' }} />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;

