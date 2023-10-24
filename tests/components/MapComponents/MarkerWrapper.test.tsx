import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Marker } from '@react-google-maps/api';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setSelectedMarker } from '@/redux/slice/fetcherSlice';
import MarkerWrapper from 'components/MapComponents/MarkerWrapper.tsx';

jest.mock('@react-google-maps/api', () => ({
  Marker: jest.fn(({ onClick }) => <div onClick={onClick}>Marker</div>),
}));

jest.mock('@/redux/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

describe('MarkerWrapper', () => {
  it('renders without crashing', () => {
    render(<MarkerWrapper />);
  });

  it('renders the correct number of Marker components', () => {
    useAppSelector.mockImplementation(() => ({ fetcher: { places: [{}, {}] } }));
    const { queryAllByText } = render(<MarkerWrapper />);
    expect(queryAllByText('Marker')).toHaveLength(2);
  });

  it('calls setSelectedMarker action when a Marker component is clicked', () => {
    const mockDispatch = jest.fn();
    useAppDispatch.mockReturnValue(mockDispatch);
    useAppSelector.mockImplementation(() => ({ fetcher: { places: [{}] } }));
    const { getByText } = render(<MarkerWrapper />);
    fireEvent.click(getByText('Marker'));
    expect(mockDispatch).toHaveBeenCalledWith(setSelectedMarker({}));
  });
});
