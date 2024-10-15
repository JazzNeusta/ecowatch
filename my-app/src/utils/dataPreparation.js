// export const prepareDataAsJSON = (data) => {
//     // Structure les données dans un objet
//     const jsonData = {
//       temperature: data.temperatureData,
//       humidity: data.humidityData,
//       CO2: data.CO2Data,
//       TVOC: data.TVOCData,
//       sound: data.soundData,
//       PM1_0: data.PM1_0Data,
//       PM2_5: data.PM2_5Data,
//       PM10: data.PM10Data,
//     };
//     return JSON.stringify(jsonData, null, 2); // Convertit l'objet en chaîne JSON avec indentation
//   };
  

//   export const prepareDataAsCSV = (data) => {
//     const headers = ["timestamp", "temperature", "humidity", "CO2", "TVOC", "sound", "PM1.0", "PM2.5", "PM10"];
//     const csvRows = [headers.join(",")];
  
//     // On parcourt les données et on crée les lignes CSV
//     data.temperatureData.forEach((_, index) => {
//       const row = [
//         new Date(data.temperatureData[index][0]).toISOString(),
//         data.temperatureData[index][1] || '',
//         data.humidityData[index]?.[1] || '',
//         data.CO2Data[index]?.[1] || '',
//         data.TVOCData[index]?.[1] || '',
//         data.soundData[index]?.[1] || '',
//         data.PM1_0Data[index]?.[1] || '',
//         data.PM2_5Data[index]?.[1] || '',
//         data.PM10Data[index]?.[1] || '',
//       ];
//       csvRows.push(row.join(","));
//     });
  
//     return csvRows.join("\n");
//   };

export const prepareDataAsJSON = (data) => {
    // Structure les données dans un objet
    const jsonData = {
      temperature: data.temperatureData,
      humidity: data.humidityData,
      CO2: data.CO2Data,
      TVOC: data.TVOCData,
      sound: data.soundData,
      PM1_0: data.PM1_0Data,
      PM2_5: data.PM2_5Data,
      PM10: data.PM10Data,
    };
    return JSON.stringify(jsonData, null, 2); // Convertit l'objet en chaîne JSON avec indentation
  };
  
  export const prepareDataAsCSV = (data) => {
    const headers = ["timestamp", "temperature", "humidity", "CO2", "TVOC", "sound", "PM1.0", "PM2.5", "PM10"];
    const csvRows = [headers.join(",")];
  
    // Calculer la longueur maximale des données pour éviter les erreurs d'accès à un index inexistant
    const maxLength = Math.max(
      data.temperatureData.length,
      data.humidityData?.length || 0,
      data.CO2Data?.length || 0,
      data.TVOCData?.length || 0,
      data.soundData?.length || 0,
      data.PM1_0Data?.length || 0,
      data.PM2_5Data?.length || 0,
      data.PM10Data?.length || 0
    );
  
    // Parcourir les données jusqu'à la longueur maximale
    for (let index = 0; index < maxLength; index++) {
      const row = [
        new Date(data.temperatureData[index]?.[0] || '').toISOString(), // Convertir l'horodatage en ISO ou mettre une chaîne vide
        data.temperatureData[index]?.[1] || '',  // Valeur de température ou chaîne vide
        data.humidityData?.[index]?.[1] || '',   // Humidité
        data.CO2Data?.[index]?.[1] || '',        // CO2
        data.TVOCData?.[index]?.[1] || '',       // TVOC
        data.soundData?.[index]?.[1] || '',      // Niveau sonore
        data.PM1_0Data?.[index]?.[1] || '',      // PM1.0
        data.PM2_5Data?.[index]?.[1] || '',      // PM2.5
        data.PM10Data?.[index]?.[1] || '',       // PM10
      ];
      csvRows.push(row.join(","));
    }
  
    return csvRows.join("\n");
  };