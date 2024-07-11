import TravelRoute from "@tripolite/common/models/travel-route";
import {TravelRouteSearchCriteria} from "@tripolite/common/models/travel-route-search-criteria";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface TravelRoutesSearchState {
    criteria: TravelRouteSearchCriteria;
    results: TravelRoute[];
}

const initialState: TravelRoutesSearchState = {
    criteria: {
        originCity: '',
        destinationCity: '',
        transportation: undefined,
    },
    results: [],
};

const travelRoutesSearchSlice = createSlice({
    name: 'travelRoutesSearch',
    initialState,
    reducers: {
        setSearchCriteria(state, action: PayloadAction<TravelRouteSearchCriteria>) {
            state.criteria = action.payload;
        },
        setSearchResults(state, action: PayloadAction<any[]>) {
            state.results = action.payload;
        }
    },
});

export const {setSearchCriteria, setSearchResults} = travelRoutesSearchSlice.actions;
export default travelRoutesSearchSlice.reducer;
