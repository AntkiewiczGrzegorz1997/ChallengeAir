import './App.css';
import React, { useState } from 'react';
import { fetchGeoJsonData } from './apiService.js';
import Form from './components/Form.jsx';
import Map from './components/Map';

function App() {
  const [coordinates, setCoordinates] = useState({
    latitude: 52.533896,
    longitude: 13.417111,
  });
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [mapCenter, setMapCenter] = useState([52.533896, 13.417111]);
  const [geoJsonKey, setGeoJsonKey] = useState(0);

  const fetchData = async () => {
    try {
      const convertedData = await fetchGeoJsonData(coordinates);
      setGeoJsonData(convertedData);
      setMapCenter([coordinates.latitude, coordinates.longitude]);
      setGeoJsonKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <div className='App'>
      <Form
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        fetchData={fetchData}
      />

      <Map
        mapCenter={mapCenter}
        geoJsonData={geoJsonData}
        geoJsonKey={geoJsonKey}
      />
    </div>
  );
}

export default App;
