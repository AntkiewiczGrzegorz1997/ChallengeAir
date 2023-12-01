import React from 'react';
import '../styles/Form.css';

export default function Form({ coordinates, setCoordinates, fetchData }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className='displayCoordinates'
      data-testid='form'
    >
      <div className='inputBox'>
        <label>Latitude</label>
        <input
          type='number'
          value={coordinates.latitude}
          onChange={(e) =>
            setCoordinates({
              ...coordinates,
              latitude: e.target.value ? parseFloat(e.target.value) : '',
            })
          }
          data-testid='inputLatitude'
        />
      </div>

      <div className='inputBox'>
        <label>Longitude</label>
        <input
          type='number'
          value={coordinates.longitude}
          onChange={(e) =>
            setCoordinates({
              ...coordinates,
              longitude: e.target.value ? parseFloat(e.target.value) : '',
            })
          }
          data-testid='inputLongitude'
        />
      </div>
      <button onClick={fetchData}>Display</button>
    </form>
  );
}
