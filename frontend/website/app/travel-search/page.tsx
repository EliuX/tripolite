"use client";

import * as React from "react";
import {useEffect, useState} from "react";
import {searchTravelsChoices} from "@/lib/api";
import {selectTravelSearchCriteria} from "@/lib/selectors";
import {useAppSelector} from "@/lib/hooks";
import {router} from "next/client";
import TravelChoice from "@tripolite/common/models/travel-choice";
import TRAVEL_METHODS_ICONS from "@/types/travel-method-icons";
import {IconSvgProps} from "@/types";
import {Spinner} from "@nextui-org/spinner";
import {Button} from "@nextui-org/button";
import {ScrollShadow} from "@nextui-org/scroll-shadow";
import {Listbox, ListboxItem} from "@nextui-org/listbox";

export default function SearchPage() {
    const [isLoadingResults, showLoadingResults] = useState(false);
    const [statusMessage, setStatusMessage]
        = useState('There are no available travel choices for your search');
    const [matchIcon, setMatchIcon]
        = useState<React.FC<IconSvgProps>>();
    const [searchResults, setSearchResults]
        = useState<TravelChoice[] | undefined>(undefined);

    const searchCriteria = useAppSelector(selectTravelSearchCriteria);

    useEffect(() => {
        showLoadingResults(true);

        if (searchCriteria) {
            if (searchCriteria.type) {
                setMatchIcon(TRAVEL_METHODS_ICONS[searchCriteria.type]);
            }

            searchTravelsChoices(searchCriteria)
                .then(results => results.map(r => new TravelChoice(r.paths, searchCriteria)))
                .then(results => {
                    showLoadingResults(false);
                    setSearchResults(results);

                    if (results.length > 0) {
                        setStatusMessage(`There are ${results.length} travel choices for you to choose from`);
                    }
                })
                .catch(err => setStatusMessage('An error occurred while searching. Please try again later.'))
                .finally(() => showLoadingResults(false));
        } else {
            router.push("/");
        }
    }, []);

    return (
        <>
            <p className="inline-block max-w-lg text-center justify-center">
                {statusMessage}
            </p>
            {isLoadingResults && <Spinner label="Searching..."/>}
            {!isLoadingResults && searchResults && searchResults.length > 0 &&
                <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
                    <Listbox
                        classNames={{
                            base: "max-w-xs",
                            list: "max-h-[300px] overflow-scroll",
                        }}
                        defaultSelectedKeys={["1"]}
                        items={searchResults}
                        label="Assigned to"
                        selectionMode="single"
                        variant="flat"
                    >

                    {searchResults.map((travelChoice: TravelChoice, index: number) => (
                        <ListboxItem key={index}
                                     textValue={`${travelChoice.paths.length} trips, ${travelChoice.satisfactionRatio * 100}% of satisfaction`}>
                            <div className="flex gap-2 items-center">
                                <div className="flex flex-col">
                                    <span
                                        className="text-small">{`${travelChoice.paths.length} trips, ${travelChoice.satisfactionRatio}% of satisfaction ratio`}</span>
                                    <span className="text-tiny text-default-400">${travelChoice.price}</span>
                                </div>
                            </div>
                        </ListboxItem>
                    ))}
                    </Listbox>
                </div>
            }
        </>
    );
}
