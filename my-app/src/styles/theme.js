// theme.js (Optionnel)
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#1C1D2E' // Couleur de fond par défaut
    },
    text: {
      primary: '#fff' // Couleur du texte par défaut
    },
    primary: {
      main: '#2E2F45' // Couleur principale des composants
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#2E2F45', // Couleur de fond des cartes
          color: '#fff', // Couleur du texte
        }
      }
    }
  }
});

export default theme;
