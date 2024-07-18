import TravelChoiceSearchCriteria from "@tripolite/common/models/travel-choice-search-criteria";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import TravelChoice, {TravelChoiceDto} from "@tripolite/common/models/travel-choice";

interface TravelRoutesSearchState {
    criteria: TravelChoiceSearchCriteria;
    results: TravelChoiceDto[];
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
        setSearchResults(state, action: PayloadAction<TravelChoiceDto[]>) {
            state.results = action.payload;
        },
        addNextPageResults(state, action: PayloadAction<TravelChoiceDto[]>) {
            state.results.push(...action.payload);
        },
    },
});

export const {setSearchCriteria, setSearchResults, addNextPageResults} = travelsSearchSlice.actions;
export default travelsSearchSlice.reducer;
