import TravelChoiceSearchCriteria from "@tripolite/common/models/travel-choice-search-criteria";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TravelChoice} from "@tripolite/common/models/travel-choice-model";

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

const travelSearchSlice = createSlice({
    name: 'travelChoicesSearch',
    initialState,
    reducers: {
        setSearchCriteria(state, action: PayloadAction<TravelChoiceSearchCriteria>) {
            state.criteria = action.payload;
            state.results = [];
        },
        setSearchResults(state, action: PayloadAction<TravelChoice[]>) {
            state.results = action.payload;
        },
        addNextPageResults(state, action: PayloadAction<TravelChoice[]>) {
            state.results.push(...action.payload);
        },
        resetSearch(state) {
            state.criteria = {...initialState.criteria};
            state.results = [];
        },
    },
});

export const {
    setSearchCriteria, setSearchResults,
    resetSearch,
    addNextPageResults
} = travelSearchSlice.actions;
export default travelSearchSlice.reducer;
