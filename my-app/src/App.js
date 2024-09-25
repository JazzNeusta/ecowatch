import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import ChartSection from './components/ChartSection';
import './App.css';

function App() {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [CO2Data, setCO2Data] = useState([]);
  const [TVOCData, setTVOCData] = useState([]);
  const [soundData, setSoundData] = useState([]);

  // Exemple de calcul de moyenne (remplacer par vos calculs réels)
  const calculateAverage = (data) => {
    if (!data.length) return 'N/A';
    const total = data.reduce((sum, value) => sum + value[1], 0);
    return (total / data.length).toFixed(2);
  };

  // Appel de l'API ou de la source de données pour remplir les tableaux avec les données réelles

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: 20, backgroundColor: '#1C1D2E' }}>
        <DashboardHeader
          temperatureAvg={calculateAverage(temperatureData)}
          humidityAvg={calculateAverage(humidityData)}
          CO2Avg={calculateAverage(CO2Data)}
          TVOCAvg={calculateAverage(TVOCData)}
          soundAvg={calculateAverage(soundData)}
        />
        <ChartSection
          temperatureData={temperatureData}
          humidityData={humidityData}
          CO2Data={CO2Data}
          TVOCData={TVOCData}
          soundData={soundData}
        />
      </div>
    </div>
  );
}

export default App;
