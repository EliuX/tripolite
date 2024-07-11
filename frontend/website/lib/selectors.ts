import { RootState } from './store';

export const selectTravelRoutes = (state: RootState) => state.travelRoutes.all;

export const selectOriginCities = (state: RootState) =>
    Array.from(new Set(state.travelRoutes.all.map(route => route.originCity)));

export const selectDestinationCities = (state: RootState) =>
    Array.from(new Set(state.travelRoutes.all.map(route => route.destinationCity)));
