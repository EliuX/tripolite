'use client';

import {useAppSelector} from "@/lib/hooks";
import {selectActiveTravelBooking} from "@/lib/selectors";
import {useEffect, useState} from "react";
import {TravelBookingStatus} from "@tripolite/common/models/travel-booking";
import TravelChoiceDetails from "@/components/travel-choice-details";
import {Button} from "@nextui-org/button";
import {useRouter} from "next/navigation";
import TravelBookingForm from "@/components/travel-booking-form";
import {subtitle, title} from "@/components/primitives";


export default function TravelBookingDetailsPage() {
    const [statusMessageElem, setStatusMessageElem] = useState(<p>There is no selected booking</p>);
    const activeTravelBooking = useAppSelector(selectActiveTravelBooking);
    const [pageTitle, setPageTitle] = useState(`Travel from ${activeTravelBooking?.travelChoice.originCity} to ${activeTravelBooking?.travelChoice.destinationCity}`);


    const router = useRouter();

    const submitBooking = () => {
        setStatusMessageElem(<div className={'text-pretty text-success-500'}>Your booking is paid!!!!</div>)
    }

    useEffect(() => {
        if (activeTravelBooking) {
            if (activeTravelBooking.status === TravelBookingStatus.Pending) {
                setPageTitle(`Your booking from ${activeTravelBooking.travelChoice.originCity} to ${activeTravelBooking.travelChoice.destinationCity}`);
                setStatusMessageElem(<p className={"text-pretty text-warning"}>This booking is Pending until the price is determined</p>);
            } else {
                setStatusMessageElem(<p className={"text-pretty text-primary"}>Your booking is ready</p>)
            }
        } else {
            router.push('/travel-bookings');
        }
    }, [activeTravelBooking]);

    return <section className={'flex flex-col gap-3 items-center'}>
        <h2 className={subtitle()}>{pageTitle}</h2>
        <section>{statusMessageElem}</section>
        {activeTravelBooking && <section className={'flex flex-col gap-4'}>
            <TravelChoiceDetails travelChoice={activeTravelBooking.travelChoice} />
            <TravelBookingForm travelBooking={activeTravelBooking} handleBooking={submitBooking}></TravelBookingForm>
        </section>}
        <Button onPress={() => router.push('/travel-bookings')}>See all Bookings</Button>
    </section>
}
