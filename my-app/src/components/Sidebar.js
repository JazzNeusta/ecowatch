// components/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, Email, BarChart, TableChart, Map, Settings, CloudDownload } from '@mui/icons-material';

const Sidebar = () => {
  return (
    <div style={{ width: 250, backgroundColor: '#2A2B3D', height: '100vh', padding: 20 }}>
      <h2 style={{ color: '#fff', textAlign: 'center' }}>ECOWATCH 360</h2>
      <List>
        <ListItem button>
          <ListItemIcon>
            <Dashboard style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" style={{ color: '#fff' }} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Email style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Email" style={{ color: '#fff' }} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BarChart style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Charts" style={{ color: '#fff' }} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <TableChart style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Tables" style={{ color: '#fff' }} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Map style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Maps" style={{ color: '#fff' }} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CloudDownload style={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Download Data" style={{ color: '#fff' }} />
        </ListItem>
        <ListItem button>
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
