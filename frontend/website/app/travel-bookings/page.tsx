import {Metadata} from "next";
import TravelBooking from "@tripolite/common/models/travel-booking";
import {useAppSelector} from "@/lib/hooks";
import {selectTravelBookings} from "@/lib/selectors";
import TravelChoiceDetails from "@/components/travel-choice-details";

export const metadata: Metadata = {
    title: 'TripOlite - Bookings',
};
export default function BookingsPage() {
    // const travelBookings = useAppSelector(selectTravelBookings)
    const handleFormSubmit = async (travelBooking: TravelBooking) => {

    };

    return (
        <div>
            {/*{travelBookings.map(tb => (*/}
            {/*    <TravelChoiceDetails travelChoice={tb.travelChoice} />*/}
            {/*))}*/}
        </div>
    );
}
