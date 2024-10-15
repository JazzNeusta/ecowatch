// import React from 'react';
// import { Button } from '@mui/material';
// import { prepareDataAsJSON, prepareDataAsCSV } from '../utils/dataPreparation';

// const downloadFile = (content, fileName, mimeType) => {
//   const blob = new Blob([content], { type: mimeType });
//   const link = document.createElement('a');
//   link.href = URL.createObjectURL(blob);
//   link.download = fileName;
//   link.click();
//   URL.revokeObjectURL(link.href);
// };

// const DownloadData = ({ data }) => {
//   const handleDownloadJSON = () => {
//     const jsonData = prepareDataAsJSON(data);
//     downloadFile(jsonData, 'sensor_data.json', 'application/json');
//   };

//   const handleDownloadCSV = () => {
//     const csvData = prepareDataAsCSV(data);
//     downloadFile(csvData, 'sensor_data.csv', 'text/csv');
//   };

//   return (
//     <div>
//       <h2 style={{ color: '#fff' }}>Download Sensor Data</h2>
//       <Button variant="contained" color="primary" onClick={handleDownloadJSON}>
//         Download JSON
//       </Button>
//       <Button variant="contained" color="secondary" onClick={handleDownloadCSV} style={{ marginLeft: '10px' }}>
//         Download CSV
//       </Button>
//     </div>
//   );
// };

// export default DownloadData;

import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { prepareDataAsJSON, prepareDataAsCSV } from '../utils/dataPreparation';

const downloadFile = (content, fileName, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
};

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

  // Gérer la sélection de données
  const handleDataTypeChange = (event) => {
    setSelectedDataTypes({
      ...selectedDataTypes,
      [event.target.name]: event.target.checked,
    });
  };

  // Filtrer les données à télécharger selon la sélection
  const filterData = (data) => {
    const filteredData = {};
    Object.keys(selectedDataTypes).forEach((key) => {
      if (selectedDataTypes[key]) {
        filteredData[`${key}Data`] = data[`${key}Data`];
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
    <div>
      <h2 style={{ color: '#fff' }}>Download Sensor Data</h2>
      <FormGroup>
        {Object.keys(selectedDataTypes).map((key) => (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                checked={selectedDataTypes[key]}
                onChange={handleDataTypeChange}
                name={key}
              />
            }
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            style={{ color: '#fff' }}
          />
        ))}
      </FormGroup>
      <Button variant="contained" color="primary" onClick={handleDownloadJSON}>
        Download JSON
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDownloadCSV}
        style={{ marginLeft: '10px' }}
      >
        Download CSV
      </Button>
    </div>
  );
};

export default DownloadData;
