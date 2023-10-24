import React from 'react';
import { render } from '@testing-library/react';
import { DirectionsRenderer } from '@react-google-maps/api';
import { useAppSelector } from '@/redux/store';
import DirectionRendererWrapper from 'components/MapComponents/DirectionRendererWrapper.tsx';

jest.mock('@react-google-maps/api', () => ({
  DirectionsRenderer: jest.fn(() => <div>DirectionsRenderer</div>),
}));

jest.mock('@/redux/store', () => ({
  useAppSelector: jest.fn(),
}));

describe('DirectionRendererWrapper', () => {
  it('renders without crashing', () => {
    render(<DirectionRendererWrapper />);
  });

  it('renders DirectionsRenderer when selectedRoute is truthy', () => {
    useAppSelector.mockImplementation(() => ({ selectedRoute: {} }));
    const { queryByText } = render(<DirectionRendererWrapper />);
    expect(queryByText('DirectionsRenderer')).toBeInTheDocument();
  });

  it('does not render DirectionsRenderer when selectedRoute is falsy', () => {
    useAppSelector.mockImplementation(() => ({ selectedRoute: null }));
    const { queryByText } = render(<DirectionRendererWrapper />);
    expect(queryByText('DirectionsRenderer')).not.toBeInTheDocument();
  });
});
