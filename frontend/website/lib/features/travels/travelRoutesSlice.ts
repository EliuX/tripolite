import TravelRoute from "@tripolite/common/models/travel-route";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface TravelRoutesState {
    all: TravelRoute[];
}

const initialState: TravelRoutesState = {
    all: [],
};

const travelRoutesSlice = createSlice({
    name: 'travelRoutes',
    initialState,
    reducers: {
        setTravelRoutes(state, action: PayloadAction<TravelRoute[]>) {
            state.all = action.payload;
        },
    },
});


export const {setTravelRoutes} = travelRoutesSlice.actions;
export default travelRoutesSlice.reducer;
