import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from '../components/Form';
import '@testing-library/jest-dom';

describe('Form', () => {
  const mockSetCoordinates = jest.fn();
  const mockFetchData = jest.fn();
  const mockCoordinates = {
    latitude: 0,
    longitude: 0,
  };
  it('calls fetchData on form submission', () => {
    render(
      <Form
        coordinates={mockSetCoordinates}
        setCoordinates={mockSetCoordinates}
        fetchData={mockFetchData}
      />
    );
    const form = screen.getByTestId('form');
    fireEvent.submit(form);
    expect(mockFetchData).toHaveBeenCalled();
  });

  it('updates state on input change', () => {
    render(
      <Form
        coordinates={mockCoordinates}
        setCoordinates={mockSetCoordinates}
        fetchData={mockFetchData}
      />
    );
    const latitudeInput = screen.getByTestId('inputLatitude');
    const longitudeInput = screen.getByTestId('inputLongitude');

    fireEvent.change(latitudeInput, { target: { value: '12.34' } });
    expect(mockSetCoordinates).toHaveBeenCalledWith({
      ...mockCoordinates,
      latitude: 12.34,
    });

    fireEvent.change(longitudeInput, { target: { value: '56.78' } });
    expect(mockSetCoordinates).toHaveBeenCalledWith({
      ...mockCoordinates,
      longitude: 56.78,
    });
  });

  it('should render correctly', () => {
    render(
      <Form
        coordinates={mockCoordinates}
        setCoordinates={mockSetCoordinates}
        fetchData={mockFetchData}
      />
    );

    expect(screen.getByText('Latitude')).toBeInTheDocument();
    expect(screen.getByText('Longitude')).toBeInTheDocument();
    expect(screen.getByText('Display')).toBeInTheDocument();
  });
});
