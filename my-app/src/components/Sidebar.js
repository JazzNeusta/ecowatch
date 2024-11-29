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


//Version responsive qui cache la barre verrticale sur les petits écrans (le sidebar))
// import React, { useState } from 'react';
// import { List, ListItem, ListItemIcon, ListItemText, Drawer, IconButton, useMediaQuery } from '@mui/material';
// import { Dashboard, CloudDownload, Settings, Notifications, Menu } from '@mui/icons-material';
// import Badge from '@mui/material/Badge';
// import Logo from '../assets/LogoECOWATCH360.png';

// const Sidebar = ({ onMenuClick, currentMenu, alertCount }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const isMobile = useMediaQuery('(max-width: 768px)'); // Détecte si l'écran est plus petit que 768px

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const getMenuStyle = (menu) => ({
//     backgroundColor: currentMenu === menu ? '#3E3F5E' : 'transparent',
//     color: '#fff',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s ease',
//     borderRadius: '8px',
//     padding: '15px',
//     marginBottom: '10px',
//   });

//   // Composant de contenu de la barre latérale
//   const sidebarContent = (
//     <div style={{ width: 250, backgroundColor: '#2A2B3D', height: '100vh', padding: 20 }}>
//       <div style={{ display: 'flex', alignItems: 'center', marginBottom: 30 }}>
//         <img src={Logo} alt="ECOWATCH 360 Logo" style={{ width: 50, height: 50, marginRight: 15 }} />
//         <h2 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 'bold' }}>ECOWATCH 360</h2>
//       </div>
//       <List>
//         <ListItem button onClick={() => onMenuClick('dashboard')} style={getMenuStyle('dashboard')}>
//           <ListItemIcon>
//             <Dashboard style={{ color: '#fff', fontSize: '2rem' }} />
//           </ListItemIcon>
//           <ListItemText
//             primary="Dashboard"
//             style={{
//               color: '#fff',
//               fontSize: '1.2rem',
//               fontWeight: 'bold',
//             }}
//           />
//         </ListItem>
//         <ListItem button onClick={() => onMenuClick('download')} style={getMenuStyle('download')}>
//           <ListItemIcon>
//             <CloudDownload style={{ color: '#fff', fontSize: '2rem' }} />
//           </ListItemIcon>
//           <ListItemText
//             primary="Download Data"
//             style={{
//               color: '#fff',
//               fontSize: '1.2rem',
//               fontWeight: 'bold',
//             }}
//           />
//         </ListItem>
//         <ListItem button onClick={() => onMenuClick('alerts')} style={getMenuStyle('alerts')}>
//           <ListItemIcon>
//             <Badge badgeContent={alertCount} color="error">
//               <Notifications style={{ color: '#fff', fontSize: '2rem' }} />
//             </Badge>
//           </ListItemIcon>
//           <ListItemText
//             primary="Alerts"
//             style={{
//               color: '#fff',
//               fontSize: '1.2rem',
//               fontWeight: 'bold',
//             }}
//           />
//         </ListItem>
//         <ListItem button onClick={() => onMenuClick('settings')} style={getMenuStyle('settings')}>
//           <ListItemIcon>
//             <Settings style={{ color: '#fff', fontSize: '2rem' }} />
//           </ListItemIcon>
//           <ListItemText
//             primary="Informations"
//             style={{
//               color: '#fff',
//               fontSize: '1.2rem',
//               fontWeight: 'bold',
//             }}
//           />
//         </ListItem>
//       </List>
//     </div>
//   );

//   return (
//     <>
//       {/* Affiche la barre latérale si l'écran est large */}
//       {!isMobile && (
//         <div style={{ width: 250, backgroundColor: '#2A2B3D', height: '100vh', padding: 20 }}>
//           {sidebarContent}
//         </div>
//       )}

//       {/* Menu burger pour mobile */}
//       {isMobile && (
//         <>
//           <IconButton
//             onClick={toggleSidebar}
//             style={{
//               position: 'fixed',
//               top: 20,
//               left: 20,
//               zIndex: 1000,
//               backgroundColor: '#FF5733',
//               color: '#fff',
//             }}
//           >
//             <Menu style={{ fontSize: '2rem' }} />
//           </IconButton>
//           <Drawer
//             anchor="left"
//             open={isSidebarOpen}
//             onClose={toggleSidebar}
//             PaperProps={{ style: { backgroundColor: '#2A2B3D' } }}
//           >
//             {sidebarContent}
//           </Drawer>
//         </>
//       )}
//     </>
//   );
// };

// export default Sidebar;
