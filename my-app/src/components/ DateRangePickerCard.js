// import React, { useState } from 'react';
// import { Card, CardContent, Button, TextField } from '@mui/material';
// import { DateRangePicker } from '@mui/x-date-pickers-pro';  // Import correct depuis x-date-pickers-pro
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; // Import correct depuis x-date-pickers
// import LocalizationProvider from '@mui/x-date-pickers/LocalizationProvider'; // Import correct pour le provider de date

// const DateRangePickerCard = () => {
//   const [value, setValue] = useState([null, null]);

//   const handleDownload = () => {
//     if (value[0] && value[1]) {
//       console.log('Téléchargement des données du', value[0], 'au', value[1]);
//       // Ici, tu ajouteras la logique pour télécharger les données
//     } else {
//       console.log('Sélectionne une plage de dates');
//     }
//   };

//   return (
//     <Card style={{ maxWidth: 400, padding: 20, backgroundColor: '#2E2F45', color: '#fff' }}>
//       <CardContent>
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//           <DateRangePicker
//             startText="Date de début"
//             endText="Date de fin"
//             value={value}
//             onChange={(newValue) => setValue(newValue)}
//             renderInput={(startProps, endProps) => (
//               <>
//                 <TextField {...startProps} style={{ marginRight: 10, color: '#fff' }} />
//                 <TextField {...endProps} style={{ color: '#fff' }} />
//               </>
//             )}
//           />
//         </LocalizationProvider>
//         <Button
//           variant="contained"
//           color="primary"
//           style={{ marginTop: 20 }}
//           onClick={handleDownload}
//         >
//           Télécharger
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default DateRangePickerCard;
