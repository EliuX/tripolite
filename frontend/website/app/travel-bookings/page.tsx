'use client';

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {selectedAvailableTravelBookings} from "@/lib/selectors";
import React, {useEffect, useState} from "react";
import {loadTravelBookings} from "@/lib/api";
import {setActiveBookingId, setTravelBookings} from "@/lib/features/travels/travelBookingSlice";
import {Selection, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import {Spinner} from "@nextui-org/spinner";
import DisplayPrice from "@/components/display-price";
import {TravelBookingStatus} from "@tripolite/common/models/travel-booking";
import {Key} from "@react-types/shared";
import {useRouter} from "next/navigation";

export default function BookingsPage() {
    const [isLoadingTravelBookings, setIsLoadingTravelBookings] = useState(false);
    const [statusMessage, setStatusMessage]
        = useState("You have not booked any travel for the moment.");
    const travelBookings = useAppSelector(selectedAvailableTravelBookings)

    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        setIsLoadingTravelBookings(true);

        loadTravelBookings().then(bookings => {
            dispatch(setTravelBookings(bookings));
            setStatusMessage('These are your bookings so far');
        })
            .catch(() => setStatusMessage("There was an error loading the bookings. Please try again later."))
            .finally(() => setIsLoadingTravelBookings(false));
    }, [dispatch]);

    const showDetailsForTravelBooking = (selection: Selection) => {
        (selection as Set<Key>).forEach(key => {
            dispatch(setActiveBookingId(travelBookings[key as number].uid));
            router.push('/travel-bookings/details');
        });
    }

    return (
        <>
            <p className="inline-block max-w-lg text-center justify-center">
                {statusMessage}
            </p>
            <Table isHeaderSticky
                   isStriped
                   selectionMode="single"
                   aria-label="Your current bookings"
                   onSelectionChange={showDetailsForTravelBooking}
                   classNames={{
                       base: "max-h-[520px] overflow-scroll",
                       table: "min-h-[420px]",
                   }}>
                <TableHeader>
                    <TableColumn>Origin City</TableColumn>
                    <TableColumn>Destination City</TableColumn>
                    <TableColumn># Connections</TableColumn>
                    <TableColumn>Price</TableColumn>
                    <TableColumn>Status</TableColumn>
                </TableHeader>
                <TableBody
                    emptyContent={'No bookings found'}
                    aria-label={"Travel bookings data"}
                    isLoading={isLoadingTravelBookings}
                    loadingContent={<Spinner label="Loading bookings..."/>}>
                    {travelBookings.map((row, index) =>
                        <TableRow key={index}>
                            <TableCell>{row.travelChoice.originCity}</TableCell>
                            <TableCell>{row.travelChoice.destinationCity}</TableCell>
                            <TableCell>{row.travelChoice.paths.length}</TableCell>
                            <TableCell>
                                <DisplayPrice price={row.travelChoice.price}></DisplayPrice>
                            </TableCell>
                            <TableCell>{row.status === TravelBookingStatus.Confirmed ?
                                <span className={'text-pretty text-success-500'}>Confirmed</span> :
                                <span className={'text-pretty text-warning-500'}>Still pending</span>
                            }</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
