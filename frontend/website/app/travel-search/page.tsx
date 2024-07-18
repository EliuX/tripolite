"use client";

import * as React from "react";
import {useEffect, useState} from "react";
import {searchTravelsChoices} from "@/lib/api";
import {
    isTravelSearchCriteriaValid,
    selectTravelChoiceSearchResults,
    selectTravelSearchCriteria,
} from "@/lib/selectors";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import TravelChoice, {TravelChoiceDto} from "@tripolite/common/models/travel-choice";
import {Spinner} from "@nextui-org/spinner";
import {addNextPageResults, setSearchResults} from "@/lib/features/travelRoutes/travelsSearchSlice";
import {useRouter} from "next/navigation";
import {DEFAULT_LIMIT, DEFAULT_OFFSET} from "@tripolite/common/paginable";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import {Button} from "@nextui-org/button";
import {useAsyncList} from "@react-stately/data";


export default function SearchPage() {
    const [isLoadingResults, showLoadingResults] = useState(false);
    const [statusMessage, setStatusMessage]
        = useState('There are no available travel choices for your search');
    const [pageNumber, setPageNumber] = useState(DEFAULT_OFFSET);
    const [hasMore, setHasMore] = useState(false);

    const searchCriteria = useAppSelector(selectTravelSearchCriteria);
    const isSearchCriteriaValid = useAppSelector(isTravelSearchCriteriaValid);
    const searchResults = useAppSelector(selectTravelChoiceSearchResults);

    const dispatch = useAppDispatch();
    const router = useRouter();

    let list = useAsyncList<TravelChoiceDto>({
        async load({signal, cursor}) {
            if (cursor) {
                setPageNumber((prev) => prev + 1);
            }

            const offset = pageNumber * DEFAULT_LIMIT;

            await searchTravelsChoices(searchCriteria, offset)
                .then(results => {
                    showLoadingResults(false);
                    dispatch(addNextPageResults(results));
                    setHasMore(results.length >= DEFAULT_LIMIT);

                    if (results.length > 0) {
                        setStatusMessage(`There are ${results.length} travel choices for you to choose from`);
                    }
                })
                .catch(err => setStatusMessage('An error occurred while searching. Please try again later.'))
                .finally(() => showLoadingResults(false));

            if (!cursor) {
                showLoadingResults(false);
            }

            return {
                items: searchResults,
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
                {statusMessage}
            </p>
            {isLoadingResults && <Spinner label="Searching..."/>}
            {!isLoadingResults && searchResults && searchResults.length > 0 &&
                <div className="flex flex-col gap-4">
                    <Table
                        isHeaderSticky
                        aria-label="Example table with infinite pagination"
                        baseRef={scrollerRef}
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
                            base: "max-h-[520px] overflow-scroll",
                            table: "min-h-[400px]",
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
                            loadingContent={<Spinner color="white"/>}
                        >
                            {searchResults.map((travelChoice: TravelChoice, index: number) => (
                                <TableRow key={travelChoice.id}>
                                    <TableCell>
                                        <div className={"flex flex-wrap whitespace-break-spaces justify-between"}>
                                            <span>{travelChoice.cities.join(" → ")}</span>
                                            {searchCriteria.type &&
                                                <span className={'text-small alig'}>({`${travelChoice.satisfactionRatio * 100}% in ${searchCriteria.type}`})</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell>{travelChoice.paths.length}</TableCell>
                                    <TableCell>
                                       <span className="text-tiny text-default-400">
                                          {travelChoice.price ? `$${travelChoice.price.toFixed(2)}` : 'Price TBD'}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            }
        </>
    );
}
