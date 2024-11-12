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
    // Nouveaux états pour les dates de filtrage
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
  
    // Fonction pour filtrer les données en fonction de la plage de dates
    const filterDataByDateRange = (data) => {
      if (!startDate || !endDate) return data; // Pas de filtrage si les dates ne sont pas définies
      const startTimestamp = new Date(startDate).getTime();
      const endTimestamp = new Date(endDate).getTime();
  
      return data.filter(([timestamp]) => timestamp >= startTimestamp && timestamp <= endTimestamp);
    };
  
    // Données filtrées en fonction de la plage de dates
    const filteredTemperatureData = filterDataByDateRange(temperatureData);
    const filteredHumidityData = filterDataByDateRange(humidityData);
    const filteredCO2Data = filterDataByDateRange(CO2Data);
    const filteredTVOCData = filterDataByDateRange(TVOCData);
    const filteredSoundData = filterDataByDateRange(soundData);
    const filteredPM1_0Data = filterDataByDateRange(PM1_0Data);
    const filteredPM2_5Data = filterDataByDateRange(PM2_5Data);
    const filteredPM10Data = filterDataByDateRange(PM10Data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://cacses3bucket0301.s3.eu-west-3.amazonaws.com/mycacsekey');   //le lien de la clé S3 correspondante au bucket "cacses3bucket0301"
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
             {/* Sélecteurs de dates pour le filtrage */}
             {/* <div style={{  marginTop: '20px', marginBottom: '20px', display: 'flex', gap: '10px' }}>
              <label>
                startDate:
                <input
                  type="datetime-local"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>
              <label>
                endDate:
                <input
                  type="datetime-local"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
            </div> */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ marginRight: 20 }}>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 4, color: '#A9A9A9' }}>
                 startDate:
                </label>
                <input
                  type="datetime-local"
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#2E2F45',
                    border: '1px solid #444',
                    borderRadius: 4,
                    color: '#FFF',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 14, marginBottom: 4, color: '#A9A9A9' }}>
                endDate:
                </label>
                <input
                  type="datetime-local"
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#2E2F45',
                    border: '1px solid #444',
                    borderRadius: 4,
                    color: '#FFF',
                    fontSize: 14,
                    outline: 'none',
                  }}
                />
              </div>
            </div>
            <ChartSection
              temperatureData={filteredTemperatureData}
              humidityData={filteredHumidityData}
              CO2Data={filteredCO2Data}
              TVOCData={filteredTVOCData}
              soundData={filteredSoundData}
              PM1_0Data={filteredPM1_0Data}
              PM2_5Data={filteredPM2_5Data}
              PM10Data={filteredPM10Data}
              startDate={startDate}
              endDate={endDate}
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
