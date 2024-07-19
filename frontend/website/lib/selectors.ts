import {RootState} from './store';
import {createSelector} from "reselect";
import {TravelChoiceModel} from "@tripolite/common/models/travel-choice-model";
import {TravelBookingModel} from "@tripolite/common/models/travel-booking";

export const selectTravelRoutes = (state: RootState) => state.travelRoutes.all;

export const selectOriginCities = createSelector(selectTravelRoutes, (travelRoutes) => {
    return Array.from(new Set(travelRoutes.map(route => route.originCity))).sort();
});

export const selectDestinationCities = createSelector(selectTravelRoutes, (travelRoutes) => {
    return Array.from(new Set(travelRoutes.map(route => route.destinationCity))).sort();
});
export const selectTravelChoicesSearch = (state: RootState) => state.travelChoicesSearch;

export const selectTravelSearchCriteria = (state: RootState) => state.travelChoicesSearch.criteria;
export const isTravelSearchCriteriaValid = createSelector(selectTravelSearchCriteria, (criteria) => {
    return !!(criteria.originCity && criteria.destinationCity);
});
export const selectTravelChoiceSearchResults = createSelector(selectTravelChoicesSearch, (search) =>
    search.results.map(dto => new TravelChoiceModel(dto.paths, dto.criteria)));

export const selectTravelBookings = (state: RootState) => state.travelBookings.bookings
    .map(dto => new TravelBookingModel(new TravelChoiceModel(dto.travelChoice.paths, dto.travelChoice.criteria)));
