import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import TravelBooking from "@tripolite/common/models/travel-booking";

interface TravelBookingState {
    bookings: TravelBooking[];
}

const initialState: TravelBookingState = {
    bookings: [],
};

const travelBookingsSlice = createSlice({
    name: 'travelBookings',
    initialState,
    reducers: {
        bookTravel(state, action: PayloadAction<TravelBooking>) {
            state.bookings.push({...action.payload});
        },
    }
});


export const {bookTravel} = travelBookingsSlice.actions;
export default travelBookingsSlice.reducer;
