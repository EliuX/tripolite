import React from "react";
import {useForm} from "react-hook-form";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import {Select, SelectItem} from "@nextui-org/select";
import {Button} from "@nextui-org/button";
import clsx from "clsx";
import {TRAVEL_METHODS} from "@tripolite/common/models/travel-method";
import TravelChoiceSearchCriteria from "@tripolite/common/models/travel-choice-search-criteria";

import {subtitle} from "@/components/primitives";
import TRAVEL_METHODS_ICONS from "@/types/travel-method-icons";

export default function SearchBox({
                                      handleSearch,
                                      originCities,
                                      destinationCities,
                                      isLoading,
                                  }: SearchBoxProps) {
    const {
        register,
        handleSubmit,
        formState: {isValid},
    } = useForm<TravelChoiceSearchCriteria>();

    return (
        <form onSubmit={handleSubmit(handleSearch)}>
            <Card className="flex w-250 flex-col flex-wrap md:flex-nowrap gap-4">
                <CardHeader className={clsx("flex flex-col", subtitle())}>
                    Search for your next trip
                </CardHeader>
                <CardBody>
                    <div className="flex flex-row flex-wrap gap-4">
                        <Select
                            className="flex-1 min-w-40"
                            isLoading={isLoading}
                            isRequired={true}
                            label="Origin"
                            placeholder="Leaving from"
                            {...register("originCity", {required: true})}
                        >
                            {originCities.map((city) => {
                                return <SelectItem key={city}>{city}</SelectItem>;
                            })}
                        </Select>
                        <Select
                            className="flex-1 min-w-40"
                            isLoading={isLoading}
                            isRequired={true}
                            label="Destination"
                            placeholder="Arriving to"
                            {...register("destinationCity", {required: true})}
                        >
                            {destinationCities.map((city) => {
                                return <SelectItem key={city}>{city}</SelectItem>;
                            })}
                        </Select>
                        <Select
                            className="flex-2 min-w-40"
                            isRequired={false}
                            label="Preferred Travel Method"
                            placeholder="Travel preferently by"
                            {...register("type")}
                        >
                            {TRAVEL_METHODS.map((method) => {
                                return (
                                    <SelectItem
                                        key={method}
                                        startContent={TRAVEL_METHODS_ICONS[method]({
                                            className:
                                                "w-6 h-6 flex justify-self-center align-middle",
                                        })}
                                    >
                                        {method}
                                    </SelectItem>
                                );
                            })}
                        </Select>
                    </div>
                </CardBody>
                <Divider/>
                <CardFooter>
                    <Button
                        color={"primary"}
                        isDisabled={!isValid}
                        radius="none"
                        type={"submit"}
                    >
                        Search
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}

export interface SearchBoxProps {
    handleSearch: (_: TravelChoiceSearchCriteria) => void;
    originCities: string[];
    destinationCities: string[];
    isLoading: boolean;
}
