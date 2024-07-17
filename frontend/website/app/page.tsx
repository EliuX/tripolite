'use client';

import {Link} from "@nextui-org/link";
import {button as buttonStyles} from "@nextui-org/theme";
import {subtitle, title} from "@/components/primitives";
import React, {Suspense, useEffect, useState} from "react";
import {Spinner} from "@nextui-org/spinner";
import SearchBox from "@/components/search-box";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {
    isTravelSearchCriteriaValid,
    selectDestinationCities,
    selectOriginCities,
    selectTravelSearchCriteria
} from "@/lib/selectors";
import {loadTravelRoutes} from "@/lib/api";
import TravelChoiceSearchCriteria from "@tripolite/common/models/travel-choice-search-criteria";
import {setSearchCriteria} from "@/lib/features/travelRoutes/travelsSearchSlice";
import {useRouter} from "next/navigation";
import {setTravelRoutes} from "@/lib/features/travelRoutes/travelRoutesSlice";

export default function Home() {
    const [isLoadingTravelRoutes, setIsLoadingTravelRoutes] = useState(false);

    const isSearchCriteriaValid = useAppSelector(isTravelSearchCriteriaValid);
    const [isSearchBoxVisible, showSearchBox] = useState<boolean>(isSearchCriteriaValid);

    const dispatch = useAppDispatch();
    const router = useRouter();


    useEffect(() => {
        setIsLoadingTravelRoutes(true);
        loadTravelRoutes().then(routes => {
            dispatch(setTravelRoutes(routes));
            setIsLoadingTravelRoutes(false);
        });
    }, [dispatch]);

    const loadSearchPage = (searchCriteria: TravelChoiceSearchCriteria) => {
        dispatch(setSearchCriteria(searchCriteria));
        router.push('/travel-search');
    }

    const originCities = useAppSelector(selectOriginCities);
    const destinationCities = useAppSelector(selectDestinationCities);

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title()}>Travels made&nbsp;</h1>
                <h1 className={title({color: "cyan"})}>simple&nbsp;</h1>
                <h2 className={subtitle({class: "mt-4"})}>
                    Discover seamless travel routes, tailored just for you. Explore. Connect. Travel with ease.
                </h2>
            </div>
            <div className={'min-w-full max-w-[250px] flex content-center items-center justify-center '}>
                {isSearchBoxVisible && <Suspense fallback={<Spinner label="Loading..."/>}>
                    <SearchBox originCities={originCities}
                               destinationCities={destinationCities}
                               isLoading={isLoadingTravelRoutes}
                               handleSearch={loadSearchPage}/>
                </Suspense>}
                {!isSearchBoxVisible && <Link className={buttonStyles({
                    color: "primary",
                    radius: "full",
                    variant: "shadow",
                })}
                                              onPress={() => showSearchBox(true)}
                >
                    Search for a flight
                </Link>}
            </div>
        </section>
    );
}
