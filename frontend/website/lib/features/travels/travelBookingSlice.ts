import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import TravelBooking from "@tripolite/common/models/travel-booking";

interface TravelBookingState {
    bookings: TravelBooking[];
    activeBookingId?: string;
}

const initialState: TravelBookingState = {
    bookings: [],
    activeBookingId: undefined,
};

const travelBookingsSlice = createSlice({
    name: 'travelBookings',
    initialState,
    reducers: {
        pushNewActiveBooking(state, action: PayloadAction<TravelBooking>) {
            state.activeBookingId = action.payload.uid;
            state.bookings.push(action.payload);
        },
        setActiveBookingId(state, action: PayloadAction<string>) {
            state.activeBookingId = action.payload;
        },
        setTravelBookings(state, action: PayloadAction<TravelBooking[]>) {
            state.bookings = action.payload;
        },
        updateTravelBookings(state, action: PayloadAction<TravelBooking>) {
            const itemToUpdateIndex = state.bookings.findIndex(t => t.uid === action.payload.uid);
            state.bookings[itemToUpdateIndex] = action.payload;
        }
    }
});


export const {
    pushNewActiveBooking,
    setTravelBookings,
    setActiveBookingId,
    updateTravelBookings
} = travelBookingsSlice.actions;
export default travelBookingsSlice.reducer;
