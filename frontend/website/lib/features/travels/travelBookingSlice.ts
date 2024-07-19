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
        setNewActiveBooking(state, action: PayloadAction<TravelBooking>) {
            state.activeBookingId = action.payload.uid;
            state.bookings.push(action.payload);
        },
        setTravelBookings(state, action: PayloadAction<TravelBooking[]>) {
            state.bookings = action.payload;
        }
    }
});


export const {setNewActiveBooking, setTravelBookings} = travelBookingsSlice.actions;
export default travelBookingsSlice.reducer;
