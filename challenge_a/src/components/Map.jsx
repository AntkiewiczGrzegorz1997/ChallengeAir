import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import '../styles/Map.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ChangeMapView } from './ChangeMapView.jsx';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default function Map({ mapCenter, geoJsonData, geoJsonKey }) {
  const polygonStyle = {
    fillColor: '#3990f7',
    fillOpacity: 0.5,
    color: '#0a3259',
  };

  const onEachObject = (object, layer) => {
    const [timestamp, name, user] = [
      object.properties.timestamp,
      object.properties.name,
      object.properties.user,
    ];

    const popupContent = `
    Timestamp: ${timestamp}<br>
    ${name ? `Name: ${name}<br>` : ``}
    User: ${user}<br>
`;

    layer.bindPopup(popupContent);
  };

  return (
    <div className='mapContainer'>
      <MapContainer zoom={15} center={mapCenter} className='map'>
        <ChangeMapView center={mapCenter} />
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geoJsonData && (
          <GeoJSON
            key={geoJsonKey}
            style={polygonStyle}
            data={geoJsonData.features}
            onEachFeature={onEachObject}
          />
        )}
      </MapContainer>
    </div>
  );
}
