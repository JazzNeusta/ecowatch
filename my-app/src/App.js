import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import ChartSection from './components/ChartSection';
import SettingsCard from './components/SettingsCard';
import './App.css';
import axios from 'axios';
import DownloadData from './components/DownloadData';
import AlertPage from './components/AlertPage';

function App() {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [CO2Data, setCO2Data] = useState([]);
  const [TVOCData, setTVOCData] = useState([]);
  const [soundData, setSoundData] = useState([]);
  const [PM1_0Data, setPM1_0Data] = useState([]);
  const [PM2_5Data, setPM2_5Data] = useState([]);
  const [PM10Data, setPM10Data] = useState([]);

  const [currentMenu, setCurrentMenu] = useState(localStorage.getItem('currentMenu') || 'dashboard');
  const [notifications, setNotifications] = useState([]);
  const [alertCount, setAlertCount] = useState(0);
  const [alertSent, setAlertSent] = useState({ temperature: false, CO2: false, TVOC: false, sound: false });

  const calculateAverage = (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) return 'N/A';
    const total = data.reduce((sum, value) => sum + value[1], 0);
    return (total / data.length).toFixed(2);
  };

  const addNotification = (message) => {
    const timestamp = new Date().toLocaleString();
    setNotifications((prev) => [...prev, { ...message, timestamp, read: false }]);
    setAlertCount((prev) => prev + 1);
  };

  const checkThresholds = (data) => {
    if (data.temperature > 35 && !alertSent.temperature) {
      addNotification({
        title: 'Température élevée',
        message: 'La température a dépassé le seuil.',
        value: `${data.temperature}°C`,
        recommendation: 'Vérifiez la climatisation.',
      });
      setAlertSent((prev) => ({ ...prev, temperature: true }));
    }
    if (data.CO2 > 1000 && !alertSent.CO2) {
      addNotification({
        title: 'Niveau de CO2 élevé',
        message: 'Le CO2 a dépassé le seuil.',
        value: `${data.CO2} ppm`,
        recommendation: 'Aérez la pièce.',
      });
      setAlertSent((prev) => ({ ...prev, CO2: true }));
    }
    if (data.TVOC > 500 && !alertSent.TVOC) {
      addNotification({
        title: 'Niveau de TVOC élevé',
        message: 'Le TVOC a dépassé le seuil.',
        value: `${data.TVOC}`,
        recommendation: 'Vérifiez les sources de pollution.',
      });
      setAlertSent((prev) => ({ ...prev, TVOC: true }));
    }
    if (data.sound_level > 80 && !alertSent.sound) {
      addNotification({
        title: 'Niveau sonore élevé',
        message: 'Le bruit a dépassé le seuil.',
        value: `${data.sound_level} dB`,
        recommendation: 'Réduisez le bruit.',
      });
      setAlertSent((prev) => ({ ...prev, sound: true }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://cacses3bucket0301.s3.eu-west-3.amazonaws.com/mycacsekey');
        const data = response.data;

        const [day, month, year, hours, minutes, seconds] = data.timestamp.split(/[- :]/);
        const timestamp = new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`).getTime();

        setTemperatureData((prevData) => [...prevData, [timestamp, parseFloat(data.temperature)]]);
        setHumidityData((prevData) => [...prevData, [timestamp, parseFloat(data.humidity)]]);
        setCO2Data((prevData) => [...prevData, [timestamp, parseFloat(data.CO2)]]);
        setTVOCData((prevData) => [...prevData, [timestamp, parseFloat(data.TVOC)]]);
        setSoundData((prevData) => [...prevData, [timestamp, parseFloat(data.sound_level)]]);
        setPM1_0Data((prevData) => [...prevData, [timestamp, parseFloat(data['PM1.0'])]]);
        setPM2_5Data((prevData) => [...prevData, [timestamp, parseFloat(data['PM2.5'])]]);
        setPM10Data((prevData) => [...prevData, [timestamp, parseFloat(data['PM10'])]]);

        checkThresholds(data);
        console.log('Données récupérées:', data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('currentMenu', currentMenu);
  }, [currentMenu]);

  const handleMenuClick = (menu) => {
    setCurrentMenu(menu);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setAlertCount(0);
  };

  const handleAlertClick = (index) => {
    const updatedNotifications = notifications.map((notification, i) => {
      if (i === index) {
        return { ...notification, read: true };
      }
      return notification;
    });

    setNotifications(updatedNotifications);
    setAlertCount(updatedNotifications.filter((notification) => !notification.read).length);
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
      <Sidebar 
        onMenuClick={handleMenuClick} 
        currentMenu={currentMenu} 
        alertCount={alertCount} 
      />
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

        {currentMenu === 'alerts' && (
          <AlertPage 
            alerts={notifications}
            clearNotifications={clearNotifications}
            onAlertClick={handleAlertClick}
          />
        )}
      </div>
    </div>
  );
}

export default App;
