'use client';

import {useAppSelector} from "@/lib/hooks";
import {selectActiveTravelBooking} from "@/lib/selectors";
import {useEffect, useState} from "react";
import {TravelBookingStatus} from "@tripolite/common/models/travel-booking";
import TravelChoiceDetails from "@/components/travel-choice-details";


export default function TravelBookingDetailsPage() {
    const [statusMessageElem, setStatusMessageElem] = useState(<p>There is no selected booking</p>);
    const activeTravelBooking = useAppSelector(selectActiveTravelBooking);

    useEffect(() => {
        if (activeTravelBooking) {
            if (activeTravelBooking.status === TravelBookingStatus.Pending) {
                setStatusMessageElem(<p className={"text-pretty text-warning"}>This booking is Pending until the price
                    is determined</p>)
            } else {
                setStatusMessageElem(<p className={"text-pretty text-primary"}>Your booking is ready</p>)
            }
        }
    }, [activeTravelBooking]);

    return <section className={'flex flex-col gap-3'}>
        {statusMessageElem}
        {activeTravelBooking && <section className={'flex flex-col gap-4'}>
            <TravelChoiceDetails travelChoice={activeTravelBooking.travelChoice}/>
        </section>}
    </section>
}
