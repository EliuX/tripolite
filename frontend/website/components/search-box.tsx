import React from "react";
import {useForm} from 'react-hook-form';
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import {Select, SelectItem} from "@nextui-org/select";
import {Button} from "@nextui-org/button";
import clsx from "clsx";
import {subtitle} from "@/components/primitives";
import {TRAVEL_METHODS} from "@tripolite/common/models/travel-method";
import {TravelRouteSearchCriteria} from "@tripolite/common/models/travel-route-search-criteria";

export default function SearchBox({handleSearch, originCities, destinationCities, isLoading}: SearchBoxProps) {
    const {register, handleSubmit, formState: {isValid}} = useForm<TravelRouteSearchCriteria>();

    return (
        <form onSubmit={handleSubmit(handleSearch)}>
            <Card className="flex w-250 flex-col flex-wrap md:flex-nowrap gap-4">
                <CardHeader className={clsx("flex flex-col", subtitle())}>
                    Search for your next trip
                </CardHeader>
                <CardBody>
                    <div className="flex flex-row flex-wrap gap-4">
                        <Select isRequired={true}
                                isLoading={isLoading}
                                className="flex-1 min-w-40"
                                label="Origin"
                                placeholder="Leaving from"
                                {...register('originCity', {required: true})}
                        >
                            {originCities.map(city => {
                                return (
                                    <SelectItem key={city}>
                                        {city}
                                    </SelectItem>
                                )
                            })}
                        </Select>
                        <Select isRequired={true}
                                isLoading={isLoading}
                                className="flex-1 min-w-40"
                                label="Destination"
                                placeholder="Arriving to"
                                {...register('destinationCity', {required: true})}
                        >
                            {destinationCities.map(city => {
                                return (
                                    <SelectItem key={city}>
                                        {city}
                                    </SelectItem>
                                )
                            })}
                        </Select>
                        <Select isRequired={false}
                                className="flex-1 min-w-40"
                                label="Travel Method"
                                placeholder="Travel by"
                                {...register('transportation')}
                        >
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
                    <Button isDisabled={!isValid} type={'submit'} color={'primary'} radius="none">
                        Search
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}

export interface SearchBoxProps {
    handleSearch: (_: TravelRouteSearchCriteria) => void;
    originCities: string[],
    destinationCities: string[],
    isLoading: boolean;
}


