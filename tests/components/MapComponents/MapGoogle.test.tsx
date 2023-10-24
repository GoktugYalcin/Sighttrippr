import React from 'react';
import { render, act } from '@testing-library/react';
import { GoogleMap } from '@react-google-maps/api';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import MapGoogle from 'components/MapComponents/MapGoogle.tsx';

jest.mock('@react-google-maps/api', () => ({
  GoogleMap: jest.fn(() => <div>GoogleMap</div>),
  useJsApiLoader: jest.fn(() => ({ isLoaded: true })),
}));

jest.mock('@/redux/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

describe('MapGoogle', () => {
  it('renders without crashing', () => {
    render(<MapGoogle />);
  });

  it('renders GoogleMap when API is loaded', () => {
    const { queryByText } = render(<MapGoogle />);
    expect(queryByText('GoogleMap')).toBeInTheDocument();
  });

  it('dispatches setFetchedRoutes action when places array changes', () => {
    const mockDispatch = jest.fn();
    useAppDispatch.mockReturnValue(mockDispatch);
    useAppSelector.mockImplementation(() => ({ fetcher: { places: [{}, {}] } }));

    act(() => {
      render(<MapGoogle />);
    });

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});
