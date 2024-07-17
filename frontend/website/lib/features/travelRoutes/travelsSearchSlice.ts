import TravelChoiceSearchCriteria from "@tripolite/common/models/travel-choice-search-criteria";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import TravelChoice from "@tripolite/common/models/travel-choice";

interface TravelRoutesSearchState {
    criteria: TravelChoiceSearchCriteria;
    results: TravelChoice[];
}

const initialState: TravelRoutesSearchState = {
    criteria: {
        originCity: '',
        destinationCity: '',
        type: undefined,
    },
    results: [],
};

const travelsSearchSlice = createSlice({
    name: 'travelChoicesSearch',
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

export const {setSearchCriteria, setSearchResults} = travelsSearchSlice.actions;
export default travelsSearchSlice.reducer;
