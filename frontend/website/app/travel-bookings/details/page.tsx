'use client';

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {selectActiveTravelBooking} from "@/lib/selectors";
import React, {useEffect, useState} from "react";
import {TravelBookingModel, TravelBookingStatus} from "@tripolite/common/models/travel-booking";
import TravelChoiceDetails from "@/components/travel-choice-details";
import {Button} from "@nextui-org/button";
import {useRouter} from "next/navigation";
import TravelBookingForm from "@/components/travel-booking-form";
import {subtitle} from "@/components/primitives";
import {isBookingCompleted} from "@tripolite/common/shared";
import {Link} from "@nextui-org/link";
import {createOrUpdateTravelBooking} from "@/lib/api";
import {Spinner} from "@nextui-org/spinner";
import {updateTravelBookings} from "@/lib/features/travels/travelBookingSlice";


export default function TravelBookingDetailsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessageElem, setStatusMessageElem] = useState(<p>There is no selected booking</p>);
    const activeTravelBooking = useAppSelector(selectActiveTravelBooking);
    const [pageTitle, setPageTitle] = useState(`Travel from ${activeTravelBooking?.travelChoice.originCity} to ${activeTravelBooking?.travelChoice.destinationCity}`);
    const [isCompleted, setCompleted] = useState(false);

    const router = useRouter();
    const dispatch = useAppDispatch();

    const submitBooking = (submittedTravelBooking: TravelBookingModel) => {
        setStatusMessageElem(<div className={'text-pretty text-success-500'}>Your booking is paid!!!!</div>)

        if (isBookingCompleted(submittedTravelBooking)) {
            createOrUpdateTravelBooking(submittedTravelBooking)
                .then((updatedBooking) => {
                    setCompleted(true);
                    setStatusMessageElem( 
                            <p className={"text-pretty text-primary"}>
                                Your booking is completed!
                            </p>
                    );

                    dispatch(updateTravelBookings(updatedBooking));
                })
                .catch(e=> {
                    setStatusMessageElem(<p className={"text-pretty text-warning-700"}>
                        There was an unexpected error. Retry later.
                    </p>)
                });
        } else {
            setStatusMessageElem(<p className={"text-pretty text-primary"}>Your booking is ready to be paid</p>);
        }
    }

    useEffect(() => {
        if (activeTravelBooking) {
            if (activeTravelBooking.status === TravelBookingStatus.Pending) {
                setPageTitle(`Your booking from ${activeTravelBooking.travelChoice.originCity} to ${activeTravelBooking.travelChoice.destinationCity}`);
                setStatusMessageElem(<p className={"text-pretty text-warning"}>This booking is Pending until the price
                    is determined</p>);
            }
        } else {
            router.push('/travel-bookings');
        }
    }, [activeTravelBooking]);

    return <section className={'flex flex-col gap-3 items-center'}>
        <h2 className={subtitle()}>{pageTitle}</h2>
        <section>{statusMessageElem}</section>
        {isLoading && <Spinner label="Saving booking..."/>}
        {activeTravelBooking && <section className={'flex flex-col gap-4'}>
            <TravelChoiceDetails travelChoice={activeTravelBooking.travelChoice}/>
            {!activeTravelBooking.isPending &&
                <TravelBookingForm travelBooking={activeTravelBooking} handleBooking={submitBooking}
                                   readonly={isCompleted || isLoading}/>}
        </section>}
        <Button onPress={() => router.push('/travel-bookings')}>See all Bookings</Button>
    </section>
}
