import {configureStore} from '@reduxjs/toolkit'
import travelRoutesReducer from "@/lib/features/travels/travelRoutesSlice";
import travelChoicesSearchReducer from "@/lib/features/travels/travelSearchSlice";
import travelBookingsReducer from "@/lib/features/travels/travelBookingSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            travelRoutes: travelRoutesReducer,
            travelChoicesSearch: travelChoicesSearchReducer,
            travelBookings: travelBookingsReducer,
        }
    });
};

type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export default AppStore;
