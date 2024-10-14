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
  
    // On parcourt les données et on crée les lignes CSV
    data.temperatureData.forEach((_, index) => {
      const row = [
        new Date(data.temperatureData[index][0]).toISOString(),
        data.temperatureData[index][1] || '',
        data.humidityData[index]?.[1] || '',
        data.CO2Data[index]?.[1] || '',
        data.TVOCData[index]?.[1] || '',
        data.soundData[index]?.[1] || '',
        data.PM1_0Data[index]?.[1] || '',
        data.PM2_5Data[index]?.[1] || '',
        data.PM10Data[index]?.[1] || '',
      ];
      csvRows.push(row.join(","));
    });
  
    return csvRows.join("\n");
  };