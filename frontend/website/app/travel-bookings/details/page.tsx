'use client';

import {useAppSelector} from "@/lib/hooks";
import {selectActiveTravelBooking} from "@/lib/selectors";
import {useEffect, useState} from "react";
import {TravelBookingModel, TravelBookingStatus} from "@tripolite/common/models/travel-booking";
import TravelChoiceDetails from "@/components/travel-choice-details";
import {Button} from "@nextui-org/button";
import {useRouter} from "next/navigation";
import TravelBookingForm from "@/components/travel-booking-form";
import {subtitle, title} from "@/components/primitives";
import {isBookingCompleted} from "@tripolite/common/shared";
import {Link} from "@nextui-org/link";


export default function TravelBookingDetailsPage() {
    const [statusMessageElem, setStatusMessageElem] = useState(<p>There is no selected booking</p>);
    const activeTravelBooking = useAppSelector(selectActiveTravelBooking);
    const [pageTitle, setPageTitle] = useState(`Travel from ${activeTravelBooking?.travelChoice.originCity} to ${activeTravelBooking?.travelChoice.destinationCity}`);
    const [isCompleted, setCompleted] = useState(false);

    const router = useRouter();

    const submitBooking = (submittedTravelBooking: TravelBookingModel) => {
        setStatusMessageElem(<div className={'text-pretty text-success-500'}>Your booking is paid!!!!</div>)

        if(isBookingCompleted(submittedTravelBooking)) {
            setCompleted(true);
            setStatusMessageElem(
                <section className={'flex flex-row justify-between'}>
                    <p className={"text-pretty text-primary"}>
                        Your booking is completed! <Link className={"cursor-pointer"} onPress={()=> router.push('/')}>Go home</Link>
                    </p>
                </section>
            );
        } else {
            setStatusMessageElem(<p className={"text-pretty text-primary"}>Your booking is ready</p>);
        }
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
            <TravelBookingForm travelBooking={activeTravelBooking} handleBooking={submitBooking} readonly={isCompleted} />
        </section>}
        <Button onPress={() => router.push('/travel-bookings')}>See all Bookings</Button>
    </section>
}
