import React, {useState} from "react";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import {Select, SelectItem} from "@nextui-org/select";
import {Button} from "@nextui-org/button";
import clsx from "clsx";
import {subtitle} from "@/components/primitives";
import {TRAVEL_METHODS, TravelMethod} from "@tripolite/common/models/travel-method";

export default function SearchBox({handleSearch, originCities, destinationCities, isLoading}: SearchBoxProps) {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination
    ] = useState('');
    const [travelMethod, selectTravelMethod] = useState<TravelMethod | ''>('');

    return (
        <Card className="flex w-250 flex-col flex-wrap md:flex-nowrap gap-4">
            <CardHeader className={clsx("flex flex-col", subtitle())}>
                Search for your next trip
            </CardHeader>
            <CardBody>
                <div className="flex flex-row flex-wrap gap-4">
                    <Select
                        isLoading={isLoading}
                        className="flex-1 min-w-40"
                        label="Origin"
                        placeholder="Leaving from"
                    >
                        {originCities.map(city => {
                            return (
                                <SelectItem key={city}>
                                    {city}
                                </SelectItem>
                            )
                        })}
                    </Select>
                    <Select
                        isLoading={isLoading}
                        className="flex-1 min-w-40"
                        label="Destination"
                        placeholder="Arriving to"
                    >
                        {destinationCities.map(city => {
                            return (
                                <SelectItem key={city}>
                                    {city}
                                </SelectItem>
                            )
                        })}
                    </Select>
                    <Select className="flex-1 min-w-40"
                            label="Travel Method"
                            placeholder="Travel in a">
                        {TRAVEL_METHODS.map(method => {
                            return (
                                <SelectItem key={method}>
                                    {method}
                                </SelectItem>
                            )
                        })}
                    </Select>
                </div>
            </CardBody>
            <Divider></Divider>
            <CardFooter>
                <Button color={'primary'} onClick={handleSearch} radius="none">
                    Search
                </Button>
            </CardFooter>
        </Card>
    );
}

export interface SearchBoxProps {
    handleSearch: React.MouseEventHandler<HTMLButtonElement> | undefined;
    originCities: string[],
    destinationCities: string[],
    isLoading: boolean;
}


