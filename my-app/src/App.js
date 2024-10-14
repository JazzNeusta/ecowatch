import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import ChartSection from './components/ChartSection';
import SettingsCard from './components/SettingsCard';  // Import du composant de paramètres
import './App.css';
import axios from 'axios';  // Importer axios pour les requêtes HTTP
import DownloadData from './components/DownloadData';

function App() {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [CO2Data, setCO2Data] = useState([]);
  const [TVOCData, setTVOCData] = useState([]);
  const [soundData, setSoundData] = useState([]);
  const [PM1_0Data, setPM1_0Data] = useState([]);  // Nouvelle donnée PM1.0
  const [PM2_5Data, setPM2_5Data] = useState([]);  // Nouvelle donnée PM2.5
  const [PM10Data, setPM10Data] = useState([]);    // Nouvelle donnée PM10
  
  const [currentMenu, setCurrentMenu] = useState('dashboard');  // Par défaut le dashboard

  // Fonction pour calculer la moyenne
  const calculateAverage = (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) return 'N/A';
    const total = data.reduce((sum, value) => sum + value[1], 0);
    return (total / data.length).toFixed(2);
  };

  // Récupération des données des capteurs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://cacses3bucket0301.s3.eu-west-3.amazonaws.com/mycacsekey');
        const data = response.data;

        // Logs pour vérifier les données récupérées
        console.log('Données récupérées:', data);

        // Correction de la conversion du timestamp
        const [day, month, year, hours, minutes, seconds] = data.timestamp.split(/[- :]/);
        const timestamp = new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`).getTime();

        // Ajouter les nouvelles données aux anciennes pour chaque capteur
        setTemperatureData((prevData) => [...prevData, [timestamp, parseFloat(data.temperature)]]);
        setHumidityData((prevData) => [...prevData, [timestamp, parseFloat(data.humidity)]]);
        setCO2Data((prevData) => [...prevData, [timestamp, parseFloat(data.CO2)]]);
        setTVOCData((prevData) => [...prevData, [timestamp, parseFloat(data.TVOC)]]);
        setSoundData((prevData) => [...prevData, [timestamp, parseFloat(data.sound_level)]]);
        setPM1_0Data((prevData) => [...prevData, [timestamp, parseFloat(data['PM1.0'])]]);  
        setPM2_5Data((prevData) => [...prevData, [timestamp, parseFloat(data['PM2.5'])]]);  
        setPM10Data((prevData) => [...prevData, [timestamp, parseFloat(data['PM10'])]]);    

      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    // Récupérer les nouvelles données toutes les 5 secondes
    fetchData();  // Exécuter une première fois lors du montage
    const interval = setInterval(fetchData, 10000);  // Puis toutes les 5 secondes
    return () => clearInterval(interval);  // Nettoyage lors du démontage
  }, [temperatureData, humidityData, CO2Data, TVOCData, soundData, PM1_0Data, PM2_5Data, PM10Data]);

  const handleMenuClick = (menu) => {
    setCurrentMenu(menu);
  };

  const data = {
    temperatureData,
    humidityData,
    CO2Data,
    TVOCData,
    soundData,
    PM1_0Data,
    PM2_5Data,
    PM10Data,
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#1C1D2E' }}>
      <Sidebar onMenuClick={handleMenuClick} currentMenu={currentMenu} />
      <div style={{ flex: 1, padding: 20 }}>
        {currentMenu === 'dashboard' && (
          <>
            <DashboardHeader
              temperatureAvg={calculateAverage(temperatureData)}
              humidityAvg={calculateAverage(humidityData)}
              CO2Avg={calculateAverage(CO2Data)}
              TVOCAvg={calculateAverage(TVOCData)}
              soundAvg={calculateAverage(soundData)}
              PM1_0Avg={calculateAverage(PM1_0Data)}  
              PM2_5Avg={calculateAverage(PM2_5Data)}  
              PM10Avg={calculateAverage(PM10Data)}    
            />
            <ChartSection
              temperatureData={temperatureData}
              humidityData={humidityData}
              CO2Data={CO2Data}
              TVOCData={TVOCData}
              soundData={soundData}
              PM1_0Data={PM1_0Data}  
              PM2_5Data={PM2_5Data}  
              PM10Data={PM10Data}    
            />
          </>
        )}

        {currentMenu === 'download' && (
          <DownloadData data={data} />
        )}

        {currentMenu === 'settings' && (
          <SettingsCard />
        )}
      </div>
    </div>
  );
}

export default App;
