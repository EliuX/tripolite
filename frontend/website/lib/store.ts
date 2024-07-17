import {configureStore} from '@reduxjs/toolkit'
import travelRoutesReducer from "@/lib/features/travelRoutes/travelRoutesSlice";
import travelChoicesSearchReducer from "@/lib/features/travelRoutes/travelsSearchSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            travelRoutes: travelRoutesReducer,
            travelChoicesSearch: travelChoicesSearchReducer,
        }
    });
};

type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export default AppStore;
