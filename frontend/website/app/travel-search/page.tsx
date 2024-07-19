"use client";

import * as React from "react";
import {useEffect, useState} from "react";
import {createOrUpdateTravelBooking, searchTravelsChoices} from "@/lib/api";
import {
    isTravelSearchCriteriaValid,
    selectTravelChoiceSearchResults,
    selectTravelSearchCriteria,
} from "@/lib/selectors";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import TravelChoice, {TravelChoiceModel} from "@tripolite/common/models/travel-choice";
import {Spinner} from "@nextui-org/spinner";
import {addNextPageResults} from "@/lib/features/travels/travelSearchSlice";
import {useRouter} from "next/navigation";
import {DEFAULT_LIMIT, DEFAULT_OFFSET} from "@tripolite/common/paginable";
import {Selection, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import {Button} from "@nextui-org/button";
import {useAsyncList} from "@react-stately/data";
import TravelChoiceDetails from "@/components/travel-choice-details";
import {Key} from "@react-types/shared";
import {Link} from "@nextui-org/link";
import {NO_PRICE_STR} from "@tripolite/common/shared";
import {pushNewActiveBooking} from "@/lib/features/travels/travelBookingSlice";


export default function SearchPage() {
    const [isLoadingResults, showLoadingResults] = useState(false);
    const [statusMessage, setStatusMessage]
        = useState('The travel choices for your search');
    const [hasMore, setHasMore] = useState(false);
    const [selectedTravelChoice, selectTravelChoice] = useState<TravelChoiceModel | undefined>();

    const searchCriteria = useAppSelector(selectTravelSearchCriteria);
    const isSearchCriteriaValid = useAppSelector(isTravelSearchCriteriaValid);
    const searchResults = useAppSelector(selectTravelChoiceSearchResults);

    const dispatch = useAppDispatch();
    const router = useRouter();

    const changeSelectedTravelChoice = (selection: Selection) => {
        (selection as Set<Key>).forEach(key => {
            selectTravelChoice(searchResults[key as number]);
        });
    };

    const handleBooking = async (travelChoice: TravelChoice) => {
        const newBooking = await createOrUpdateTravelBooking({travelChoice});
        dispatch(pushNewActiveBooking(newBooking));
        router.push('/travel-bookings/details');
    };

    const list = useAsyncList<TravelChoice>({
        async load({signal, cursor}) {
            if (searchCriteria.destinationCity === searchCriteria.originCity) {
                setStatusMessage('Travels inside the same city are not provided');

                return {
                    items: [],
                    cursor: '',
                };
            }

            let pageNumber = DEFAULT_OFFSET;
            showLoadingResults(!cursor);
            if (cursor) {
                pageNumber = parseInt(cursor);
            }

            const offset = pageNumber * DEFAULT_LIMIT;

            const items = await searchTravelsChoices(searchCriteria, offset)
                .then(results => {
                    dispatch(addNextPageResults(results));
                    setHasMore(results.length >= DEFAULT_LIMIT);

                    if (results.length > 0) {
                        setStatusMessage(`These are the available choices from ${searchCriteria.originCity} to ${searchCriteria.destinationCity}${searchCriteria.type ? `, prioritizing traveling by ${searchCriteria.type}` : ''}.`);
                    } else {
                        setStatusMessage('There are no available travel choices for your search');
                    }

                    return results;
                })
                .catch(err => setStatusMessage('An error occurred while searching. Please try again later.'))
                .finally(() => showLoadingResults(false));

            return {
                items: items || [],
                cursor: (pageNumber + 1).toString(),
            };
        },
    });

    const [loaderRef, scrollerRef] = useInfiniteScroll({hasMore, onLoadMore: list.loadMore});

    useEffect(() => {
        if (!isSearchCriteriaValid) {
            router.push("/");
        }
    }, [isSearchCriteriaValid]);

    return (
        <>
            <p className="inline-block max-w-lg text-center justify-center">
                {statusMessage} <Link onPress={router.back} className={"cursor-pointer"}>New search</Link>
            </p>
            {isLoadingResults
                ? <Spinner label="Searching..."/>
                : (searchResults.length) ?
                    <div className="flex flex-row gap-4">
                        <Table
                            hideHeader
                            isStriped
                            color={"default"}
                            aria-label={statusMessage}
                            baseRef={scrollerRef}
                            selectionMode="single"
                            onSelectionChange={changeSelectedTravelChoice}
                            bottomContent={
                                hasMore && !isLoadingResults ? (
                                    <div className="flex w-full justify-center">
                                        <Button isDisabled={isLoadingResults} variant="flat" onPress={list.loadMore}>
                                            {list.isLoading && <Spinner ref={loaderRef} color="white" size="sm"/>}
                                            Load More
                                        </Button>
                                    </div>
                                ) : null
                            }
                            classNames={{
                                base: "max-h-[520px] overflow-scroll flex-2",
                                table: "min-h-[450px]",
                            }}
                        >
                            <TableHeader>
                                <TableColumn key="description">Description</TableColumn>
                                <TableColumn key="connections">Number of connection</TableColumn>
                                <TableColumn key="price">Price</TableColumn>
                            </TableHeader>
                            <TableBody
                                isLoading={isLoadingResults}
                                items={list.items}
                                emptyContent={statusMessage}
                                loadingContent={<Spinner color="white"/>}
                            >
                                {searchResults.map((travelChoice: TravelChoiceModel, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <div className={"flex flex-wrap whitespace-break-spaces justify-between"}>
                                                <span>{travelChoice.cities.join(" → ")}</span>
                                                {searchCriteria.type &&
                                                    <span
                                                        className={'text-small align-middle'}>({`${Math.floor(travelChoice.satisfactionRatio * 100)}% in ${searchCriteria.type}`})</span>}
                                            </div>
                                        </TableCell>
                                        <TableCell className={'text-center'}>{travelChoice.paths.length > 1 ? `${travelChoice.paths.length - 1} stops` : 'direct'}</TableCell>
                                        <TableCell>
                                       <span className="text-tiny text-default-400">
                                          {travelChoice.price ? `$${travelChoice.price.toFixed(2)}` : NO_PRICE_STR}
                                        </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {selectedTravelChoice &&
                            <TravelChoiceDetails travelChoice={selectedTravelChoice} handleBooking={handleBooking}/>}
                    </div>
                    : <Button onPress={router.back}>Go back</Button>
            }
        </>
    );
}
