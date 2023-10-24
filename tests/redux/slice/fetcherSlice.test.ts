import { configureStore } from "@reduxjs/toolkit";
import fetcherSlice, {
  setCity,
  updatePlaces,
  setPlaces,
  setSelectedMarker,
  setFetchedRoutes,
  setSelectedRoute,
} from "redux/slice/fetcherSlice";

describe("fetcherSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({ reducer: fetcherSlice });
  });

  it("should handle setCity", () => {
    store.dispatch(setCity("New York"));
    expect(store.getState().city).toEqual("New York");
  });

  it("should handle updatePlaces", () => {
    store.dispatch(updatePlaces([{ id: 1 }, { id: 2 }]));
    expect(store.getState().places).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it("should handle setPlaces", () => {
    store.dispatch(setPlaces([{ id: 3 }, { id: 4 }]));
    expect(store.getState().places).toEqual([{ id: 3 }, { id: 4 }]);
  });

  it("should handle setSelectedMarker", () => {
    store.dispatch(setSelectedMarker({ id: 1 }));
    expect(store.getState().selectedMarker).toEqual({ id: 1 });
  });

  it("should handle setFetchedRoutes", () => {
    store.dispatch(setFetchedRoutes([{ id: 1 }, { id: 2 }]));
    expect(store.getState().fetchedRoutes).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it("should handle setSelectedRoute", () => {
    store.dispatch(setSelectedRoute({ id: 1 }));
    expect(store.getState().selectedRoute).toEqual({ id: 1 });
  });
});
