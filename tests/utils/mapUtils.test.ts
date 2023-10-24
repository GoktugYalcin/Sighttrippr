import { createRouteObject, mapStyles } from '@/utils/mapUtils';

describe('mapUtils', () => {
  describe('mapStyles', () => {
    it('should be defined', () => {
      expect(mapStyles).toBeDefined();
    });

    it('should be an array', () => {
      expect(Array.isArray(mapStyles)).toBe(true);
    });
  });

  describe('createRouteObject', () => {
    it('should return the correct object given valid inputs', () => {
      const prevPlace = {
        geometry: {
          location: {
            lat: 1,
            lng: 2,
          },
        },
      };

      const place = {
        geometry: {
          location: {
            lat: 3,
            lng: 4,
          },
        },
      };

      const result = createRouteObject(prevPlace, place);

      expect(result).toEqual({
        origin: {
          lat: 1,
          lng: 2,
        },
        destination: {
          lat: 3,
          lng: 4,
        },
        travelMode: 'DRIVING',
      });
    });

    it('should handle edge cases', () => {
      const prevPlace = {
        geometry: {
          location: {},
        },
      };

      const place = {
        geometry: {
          location: {},
        },
      };

      const result = createRouteObject(prevPlace, place);

      expect(result).toEqual({
        origin: {
          lat: 0,
          lng: 0,
        },
        destination: {
          lat: 0,
          lng: 0,
        },
        travelMode: 'DRIVING',
      });
    });
  });
});
