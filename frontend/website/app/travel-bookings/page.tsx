'use client';

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {selectedAvailableTravelBookings} from "@/lib/selectors";
import React, {useEffect, useState} from "react";
import {loadTravelBookings} from "@/lib/api";
import {setTravelBookings} from "@/lib/features/travels/travelBookingSlice";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import {Spinner} from "@nextui-org/spinner";
import DisplayPrice from "@/components/display-price";
import {TravelBookingStatus} from "@tripolite/common/models/travel-booking";

export default function BookingsPage() {
    const [isLoadingTravelBookings, setIsLoadingTravelBookings] = useState(false);
    const [defaultMessage, changeDefaultMessage]
        = useState("You have not booked any travel for the moment.");
    const travelBookings = useAppSelector(selectedAvailableTravelBookings)

    const dispatch = useAppDispatch();

    useEffect(() => {
        setIsLoadingTravelBookings(true);

        loadTravelBookings().then(bookings => {
            dispatch(setTravelBookings(bookings));
        })
            .catch(() => changeDefaultMessage("There was an error loading the bookings. Please try again later."))
            .finally(() => setIsLoadingTravelBookings(false));
    }, [dispatch]);

    return (
        <>
            <p className="inline-block max-w-lg text-center justify-center">
                These are your bookings so far
            </p>
            <Table isHeaderSticky isStriped aria-label="Your current bookings"
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
                    emptyContent={<p>{defaultMessage}</p>}
                    aria-label={"Travel bookings data"}
                    isLoading={isLoadingTravelBookings && travelBookings?.length > 0}
                    loadingContent={<Spinner label="Loading bookings..."/>}>
                    {travelBookings.map((row) =>
                        <TableRow key={row.uid}
                                  className={TravelBookingStatus.Confirmed ? 'border-success-700' : 'border-warning-700 cursor-pointer'}>
                            <TableCell>{row.travelChoice.originCity}</TableCell>
                            <TableCell>{row.travelChoice.destinationCity}</TableCell>
                            <TableCell>{row.travelChoice.paths.length}</TableCell>
                            <TableCell>
                                <DisplayPrice price={row.travelChoice.price}></DisplayPrice>
                            </TableCell>
                            <TableCell>{row.status === TravelBookingStatus.Confirmed ? 'Confirmed' : 'Still pending'}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
