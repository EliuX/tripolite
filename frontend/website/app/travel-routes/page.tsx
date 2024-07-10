'use client';
import {siteConfig} from "@/config/site";
import React, {useEffect, useState} from "react";
import TravelRoute from "@tripolite/common/models/travel-route";
import {Spinner} from "@nextui-org/spinner";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/table";


export default function TravelRoutesPage() {
    const [travelRoutes, setTravelRoutes] = useState([] as TravelRoute[]);

    useEffect(() => {
        const getData = () => {
            return fetch(siteConfig.services.api.travelRoutes.path)
                .then(response => response.json());
        };

        getData().then(r => setTravelRoutes(r));
    }, []);

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
