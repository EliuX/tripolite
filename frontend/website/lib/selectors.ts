import {RootState} from './store';
import {createSelector} from "reselect";
import {TravelChoiceModel} from "@tripolite/common/models/travel-choice";
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

export const selectTravelBookings = (state: RootState) => state.travelBookings;

export const selectedAvailableTravelBookings = createSelector(selectTravelBookings, (travelBookings) => travelBookings.bookings.map(dto => new TravelBookingModel(dto.uid,
    new TravelChoiceModel(dto.travelChoice.paths, dto.travelChoice.criteria),
    dto.personalInfo, dto.paymentDetails)));

export const selectActiveTravelBooking = createSelector(
    [selectTravelBookings, selectedAvailableTravelBookings],
    (bookings, availableBookings) => availableBookings.find(i => i.uid === bookings.activeBookingId));


