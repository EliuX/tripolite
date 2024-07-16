import TravelRoute from "@tripolite/common/models/travel-route";
import TravelChoiceSearchCriteria from "@tripolite/common/models/travel-choice-search-criteria";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface TravelRoutesSearchState {
    criteria: TravelChoiceSearchCriteria;
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
        setSearchCriteria(state, action: PayloadAction<TravelChoiceSearchCriteria>) {
            state.criteria = action.payload;
        },
        setSearchResults(state, action: PayloadAction<any[]>) {
            state.results = action.payload;
        }
    },
});

export const {setSearchCriteria, setSearchResults} = travelRoutesSearchSlice.actions;
export default travelRoutesSearchSlice.reducer;
