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
    // data validation
    if (
      Math.abs(coordinates.latitude) > 90 ||
      Math.abs(coordinates.longitude) > 180
    ) {
      alert(
        'Please provide correct latitude and longitude: for latitude a value between [-90, 90] and for longitude value between [-180, 180]'
      );
    } else {
      try {
        const convertedData = await fetchGeoJsonData(coordinates);
        setGeoJsonData(convertedData);
        setMapCenter([coordinates.latitude, coordinates.longitude]);
        setGeoJsonKey((prevKey) => prevKey + 1);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
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
