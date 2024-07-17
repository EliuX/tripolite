'use client';
import React, {useEffect, useState} from "react";
import {Spinner} from "@nextui-org/spinner";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {selectTravelRoutes} from "@/lib/selectors";
import {loadTravelRoutes} from "@/lib/api";
import {setTravelRoutes} from "@/lib/features/travelRoutes/travelRoutesSlice";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;


export default function TravelRoutesPage() {
    const [isLoadingTravelRoutes, setIsLoadingTravelRoutes] = useState(false);
    const [defaultMessage, changeDefaultMessage]
        = useState("There is no travel routes available for the moment. Please try again later.");

    const travelRoutes = useAppSelector(selectTravelRoutes);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setIsLoadingTravelRoutes(true);
        loadTravelRoutes().then(routes => {
            dispatch(setTravelRoutes(routes));
        })
            .catch(()=> changeDefaultMessage("There was an error loading the travel routes. Please try again later."))
            .finally(() => setIsLoadingTravelRoutes(false));
    }, [dispatch]);

    return (
        <>
            <p className="inline-block max-w-lg text-center justify-center">
                This is the list of available routes you can take
            </p>
            <Table isHeaderSticky isStriped aria-label="Available routes for traveling in this travel agency"
                   classNames={{
                       base: "max-h-[520px] overflow-scroll",
                       table: "min-h-[420px]",
                   }}>
                <TableHeader>
                    <TableColumn>Origin City</TableColumn>
                    <TableColumn>Destination City</TableColumn>
                    <TableColumn>Transportation</TableColumn>
                    <TableColumn>Type</TableColumn>
                    <TableColumn>Price</TableColumn>
                    <TableColumn>Schedule</TableColumn>
                </TableHeader>
                <TableBody
                    emptyContent={<p>{defaultMessage}</p>}
                    aria-label={"Travel routes data"}
                    isLoading={isLoadingTravelRoutes && !travelRoutes?.length}
                    loadingContent={<Spinner label="Loading..."/>}>
                    {travelRoutes.map((row) =>
                        <TableRow key={row.uid}>
                            <TableCell>{row.originCity}</TableCell>
                            <TableCell>{row.destinationCity}</TableCell>
                            <TableCell>{row.transportation}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell>{row.schedule}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
