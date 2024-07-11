import {configureStore} from '@reduxjs/toolkit'
import travelRoutesReducer from "@/lib/features/travelRoutesSlice";
import travelRoutesSearchReducer from "@/lib/features/travelRoutesSearchSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            travelRoutes: travelRoutesReducer,
            searchTravelRoutes: travelRoutesSearchReducer,
        }
    });
};

type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export default AppStore;
