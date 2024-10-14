import React from 'react';
import { Button } from '@mui/material';
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
  const handleDownloadJSON = () => {
    const jsonData = prepareDataAsJSON(data);
    downloadFile(jsonData, 'sensor_data.json', 'application/json');
  };

  const handleDownloadCSV = () => {
    const csvData = prepareDataAsCSV(data);
    downloadFile(csvData, 'sensor_data.csv', 'text/csv');
  };

  return (
    <div>
      <h2 style={{ color: '#fff' }}>Download Sensor Data</h2>
      <Button variant="contained" color="primary" onClick={handleDownloadJSON}>
        Download JSON
      </Button>
      <Button variant="contained" color="secondary" onClick={handleDownloadCSV} style={{ marginLeft: '10px' }}>
        Download CSV
      </Button>
    </div>
  );
};

export default DownloadData;


// import React, { useState } from 'react';
// import { Button, FormControlLabel, Checkbox } from '@mui/material';
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
//   const [selectedDataTypes, setSelectedDataTypes] = useState({
//     temperature: true,
//     humidity: true,
//     CO2: true,
//     TVOC: true,
//     sound: true,
//     PM1_0: true,
//     PM2_5: true,
//     PM10: true,
//   });

//   const handleCheckboxChange = (event) => {
//     const { name, checked } = event.target;
//     setSelectedDataTypes((prev) => ({
//       ...prev,
//       [name]: checked,
//     }));
//   };

//   const handleDownloadJSON = () => {
//     // Filtrer les données en fonction des types sélectionnés
//     const filteredData = Object.entries(data)
//       .filter(([key]) => selectedDataTypes[key])
//       .reduce((obj, [key, value]) => {
//         obj[key] = value;
//         return obj;
//       }, {});
    
//     // Vérifier si au moins un des ensembles de données est non vide
//     const hasData = Object.values(filteredData).some((arr) => Array.isArray(arr) && arr.length > 0);

//     if (!hasData) {
//       alert('Veuillez sélectionner au moins un type de données pour télécharger.');
//       return;
//     }

//     const jsonData = prepareDataAsJSON(filteredData);
//     downloadFile(jsonData, 'sensor_data.json', 'application/json');
//   };

//   const handleDownloadCSV = () => {
//     // Filtrer les données en fonction des types sélectionnés
//     const filteredData = Object.entries(data)
//       .filter(([key]) => selectedDataTypes[key])
//       .reduce((obj, [key, value]) => {
//         obj[key] = value;
//         return obj;
//       }, {});

//     // Vérifier si au moins un des ensembles de données est non vide
//     const hasData = Object.values(filteredData).some((arr) => Array.isArray(arr) && arr.length > 0);

//     if (!hasData) {
//       alert('Veuillez sélectionner au moins un type de données pour télécharger.');
//       return;
//     }

//     const csvData = prepareDataAsCSV(filteredData);
//     downloadFile(csvData, 'sensor_data.csv', 'text/csv');
//   };

//   return (
//     <div>
//       <h2 style={{ color: '#fff' }}>Download Sensor Data</h2>
//       <div style={{ marginBottom: '20px' }}>
//         {Object.keys(selectedDataTypes).map((type) => (
//           <FormControlLabel
//             key={type}
//             control={
//               <Checkbox
//                 checked={selectedDataTypes[type]}
//                 onChange={handleCheckboxChange}
//                 name={type}
//                 style={{ color: '#fff' }}
//               />
//             }
//             label={type.charAt(0).toUpperCase() + type.slice(1)}
//             style={{ color: '#fff' }}
//           />
//         ))}
//       </div>
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
