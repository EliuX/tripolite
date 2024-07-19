import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import TravelChoiceModel from "@tripolite/common/models/travel-choice-model";
import TravelBooking, {TravelBookingModel} from "@tripolite/common/models/travel-booking";

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
        bookTravel(state, action: PayloadAction<TravelChoiceModel>) {
            state.bookings.push(new TravelBookingModel(action.payload).toDto());
        },
        removeBooking(state, action: PayloadAction<TravelChoiceModel>) {
            state.bookings = state.bookings.filter(booking => booking.travelChoice.id !== action.payload.id)
        },
    }
});


export const {bookTravel} = travelBookingsSlice.actions;
export default travelBookingsSlice.reducer;
