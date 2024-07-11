'use client';
import React, {useEffect, useState} from "react";
import {Spinner} from "@nextui-org/spinner";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/table";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {selectTravelRoutes} from "@/lib/selectors";
import {setTravelRoutes} from "@/lib/store";
import {loadTravelRoutes} from "@/lib/api";


export default function TravelRoutesPage() {
    const [isLoadingTravelRoutes, setIsLoadingTravelRoutes] = useState(false);
    const travelRoutes = useAppSelector(selectTravelRoutes);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setIsLoadingTravelRoutes(true);
        loadTravelRoutes().then(routes => {
            dispatch(setTravelRoutes(routes));
            setIsLoadingTravelRoutes(false);
        });
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
                <TableBody emptyContent={ <p>There is no travel routes available for the moment. Please try again later.</p> }
                           aria-label={"Travel routes data"}
                           isLoading={isLoadingTravelRoutes}
                           loadingContent={<Spinner label="Loading..." />}>
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
