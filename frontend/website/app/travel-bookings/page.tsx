import {Metadata} from "next";
import TravelBooking from "@tripolite/common/models/travel-booking";
import {useAppSelector} from "@/lib/hooks";
import {selectTravelBookings} from "@/lib/selectors";

export const metadata: Metadata = {
    title: 'TripOlite - Bookings',
};
export default function BookingsPage() {
    useAppSelector(selectTravelBookings)
    const handleFormSubmit = async (travelBooking: TravelBooking) => {

    };

    return (
        <div>

        </div>
    );
}
