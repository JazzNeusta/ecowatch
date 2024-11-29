import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { prepareDataAsJSON, prepareDataAsCSV } from '../utils/dataPreparation';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const downloadFile = (content, fileName, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
};

// Création d'un thème personnalisé pour Material-UI
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff', // Couleur principale en blanc
    },
    text: {
      primary: '#ffffff', // Texte en blanc
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ffffff', // Couleur de la bordure en blanc
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ffffff', // Couleur de la bordure au survol
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ffffff', // Couleur de la bordure lorsqu'elle est focus
          },
        },
      },
    },
  },
});

const DownloadData = ({ data }) => {
  const [selectedDataTypes, setSelectedDataTypes] = useState({
    temperature: true,
    humidity: true,
    CO2: true,
    TVOC: true,
    sound: true,
    PM1_0: true,
    PM2_5: true,
    PM10: true,
  });

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleDataTypeChange = (event) => {
    setSelectedDataTypes({
      ...selectedDataTypes,
      [event.target.name]: event.target.checked,
    });
  };

  const filterData = (data) => {
    const filteredData = {};
    const startTime = startDate ? new Date(startDate).getTime() : null;
    const endTime = endDate ? new Date(endDate).getTime() : null;

    Object.keys(selectedDataTypes).forEach((key) => {
      if (selectedDataTypes[key]) {
        filteredData[`${key}Data`] = data[`${key}Data`].filter((entry) => {
          const timestamp = entry[0];
          if (startTime && timestamp < startTime) return false;
          if (endTime && timestamp > endTime) return false;
          return true;
        });
      }
    });

    return filteredData;
  };

  const handleDownloadJSON = () => {
    const filteredData = filterData(data);
    const jsonData = prepareDataAsJSON(filteredData);
    downloadFile(jsonData, 'sensor_data_filtered.json', 'application/json');
  };

  const handleDownloadCSV = () => {
    const filteredData = filterData(data);
    const csvData = prepareDataAsCSV(filteredData);
    downloadFile(csvData, 'sensor_data_filtered.csv', 'text/csv');
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: '20px', backgroundColor: '#1C1D2E', borderRadius: '10px', color: '#fff' }}>
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>Download Sensor Data</h2>

        <FormGroup style={{ marginBottom: '20px' }}>
          {Object.keys(selectedDataTypes).map((key) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={selectedDataTypes[key]}
                  onChange={handleDataTypeChange}
                  name={key}
                  style={{ color: '#fff' }}
                />
              }
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              style={{ color: '#fff' }}
            />
          ))}
        </FormGroup>

        <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <TextField
            label="Start Date"
            type="datetime-local"
            InputLabelProps={{ shrink: true, style: { color: '#fff' } }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
          />
          <TextField
            label="End Date"
            type="datetime-local"
            InputLabelProps={{ shrink: true, style: { color: '#fff' } }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
          />
        </div>

        <Button variant="contained" color="primary" onClick={handleDownloadJSON} style={{ marginRight: '10px' }}>
          Download JSON
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDownloadCSV}>
          Download CSV
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default DownloadData;