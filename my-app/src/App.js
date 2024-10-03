import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import ChartSection from './components/ChartSection';
import SettingsCard from './components/SettingsCard';  // Import du composant de paramètres
import './App.css';
import axios from 'axios';  // Importer axios pour les requêtes HTTP

function App() {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [CO2Data, setCO2Data] = useState([]);
  const [TVOCData, setTVOCData] = useState([]);
  const [soundData, setSoundData] = useState([]);
  
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
        const response = await axios.get('https://bucket-archi1.s3.eu-west-1.amazonaws.com/s3Key');
        const data = response.data;

        // Logs pour vérifier les données récupérées
        console.log('Données récupérées:', data);

        // Extraction du timestamp depuis dateTime
        const timestamp = new Date(data.dateTime).getTime();  // Convertir en timestamp correct

        // Ajouter les nouvelles données aux anciennes pour chaque capteur
        setTemperatureData((prevData) => [...prevData, [timestamp, parseFloat(data.temperature)]]);
        setHumidityData((prevData) => [...prevData, [timestamp, parseFloat(data.humidity)]]);
        setCO2Data((prevData) => [...prevData, [timestamp, parseFloat(data.CO2)]]);
        setTVOCData((prevData) => [...prevData, [timestamp, parseFloat(data.TVOC)]]);
        setSoundData((prevData) => [...prevData, [timestamp, parseFloat(data.dBA)]]);

        // Logs pour vérifier les données envoyées aux graphiques
        console.log('Temperature Data:', temperatureData);
        console.log('Humidity Data:', humidityData);
        console.log('CO2 Data:', CO2Data);
        console.log('TVOC Data:', TVOCData);
        console.log('Sound Data:', soundData);

      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    // Récupérer les nouvelles données toutes les 5 secondes
    fetchData();  // Exécuter une première fois lors du montage
    const interval = setInterval(fetchData, 5000);  // Puis toutes les 5 secondes
    return () => clearInterval(interval);  // Nettoyage lors du démontage
  }, [temperatureData, humidityData, CO2Data, TVOCData, soundData]);

  const handleMenuClick = (menu) => {
    setCurrentMenu(menu);
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
            />
            <ChartSection
              temperatureData={temperatureData}
              humidityData={humidityData}
              CO2Data={CO2Data}
              TVOCData={TVOCData}
              soundData={soundData}
            />
          </>
        )}

        {currentMenu === 'settings' && (
          <SettingsCard />
        )}
      </div>
    </div>
  );
}

export default App;
