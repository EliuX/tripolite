import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit'
import TravelRoute from "@tripolite/common/models/travel-route";

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

export const makeStore = () => {
    return configureStore({
        reducer: {
            travelRoutes: travelRoutesSlice.reducer,
        }
    })
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
