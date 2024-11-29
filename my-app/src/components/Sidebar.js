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
    borderRadius: '8px', // Ajout de bordures arrondies pour chaque item
    padding: '15px', // Agrandir l'espacement interne
    marginBottom: '10px', // Espacement entre les items
  });

  return (
    <div
      style={{
        width: 300, // Augmenter la largeur de la barre latérale
        backgroundColor: '#2A2B3D',
        height: '125vh',
        padding: 25, // Ajouter un peu de padding
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 30, // Espacement plus grand en bas
        }}
      >
        <img
          src={Logo}
          alt="ECOWATCH 360 Logo"
          style={{ width: 50, height: 50, marginRight: 15 }} // Augmenter la taille du logo
        />
        <h2 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 'bold' }}>ECOWATCH 360</h2> {/* Agrandir le texte */}
      </div>
      <List>
        <ListItem button onClick={() => onMenuClick('dashboard')} style={getMenuStyle('dashboard')}>
          <ListItemIcon style={{ minWidth: 40 }}>
            <Dashboard style={{ color: '#fff', fontSize: '2rem' }} /> {/* Agrandir l'icône */}
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            style={{
              color: '#fff',
              fontSize: '1.2rem', // Agrandir le texte
              fontWeight: 'bold', // Rendre le texte plus visible
            }}
          />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('download')} style={getMenuStyle('download')}>
          <ListItemIcon style={{ minWidth: 40 }}>
            <CloudDownload style={{ color: '#fff', fontSize: '2rem' }} />
          </ListItemIcon>
          <ListItemText
            primary="Download Data"
            style={{
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('alerts')} style={getMenuStyle('alerts')}>
          <ListItemIcon style={{ minWidth: 40 }}>
            <Badge badgeContent={alertCount} color="error">
              <Notifications style={{ color: '#fff', fontSize: '2rem' }} />
            </Badge>
          </ListItemIcon>
          <ListItemText
            primary="Alerts"
            style={{
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('settings')} style={getMenuStyle('settings')}>
          <ListItemIcon style={{ minWidth: 40 }}>
            <Settings style={{ color: '#fff', fontSize: '2rem' }} />
          </ListItemIcon>
          <ListItemText
            primary="Informations"
            style={{
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
