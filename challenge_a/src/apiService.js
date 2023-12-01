import osmtogeojson from 'osmtogeojson';

const url = 'https://www.openstreetmap.org/api/0.6/map';

export const fetchGeoJsonData = async (coordinates, delta = 0.001) => {
  const apiUrl = `${url}?bbox=${coordinates.longitude},${
    coordinates.latitude
  },${coordinates.longitude + delta},${coordinates.latitude + delta}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(responseText, 'text/xml');
    const convertedData = osmtogeojson(xmlDoc);
    if (!validateGeoJsonStructure(convertedData)) {
      throw new Error('Invalid GeoJSON data');
    }
    return convertedData;
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};

const validateGeoJsonStructure = (data) => {
  if (!data || typeof data !== 'object' || data.type !== 'FeatureCollection') {
    return false;
  }
  if (!Array.isArray(data.features)) {
    return false;
  }
  return true;
};
