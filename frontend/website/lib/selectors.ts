import {RootState} from './store';
import {createSelector} from "reselect";

export const selectTravelRoutes = (state: RootState) => state.travelRoutes.all;

export const selectOriginCities = createSelector(selectTravelRoutes, (travelRoutes) => {
    return Array.from(new Set(travelRoutes.map(route => route.originCity))).sort();
});

export const selectDestinationCities = createSelector(selectTravelRoutes, (travelRoutes) => {
    return Array.from(new Set(travelRoutes.map(route => route.destinationCity))).sort();
});

export const selectTravelSearchCriteria = (state: RootState) => state.travelChoicesSearch.criteria;
export const isTravelSearchCriteriaValid = createSelector(selectTravelSearchCriteria, (criteria) => {
    return !!(criteria.originCity && criteria.destinationCity);
});
export const selectTravelSearchResults = (state: RootState) => state.travelChoicesSearch.results;
