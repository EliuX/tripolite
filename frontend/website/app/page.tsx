'use client';

import {Link} from "@nextui-org/link";
import {button as buttonStyles} from "@nextui-org/theme";
import {subtitle, title} from "@/components/primitives";
import {Suspense, useEffect, useState} from "react";
import {Spinner} from "@nextui-org/spinner";
import SearchBox from "@/components/search-box";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {selectDestinationCities, selectOriginCities} from "@/lib/selectors";
import {loadTravelRoutes} from "@/lib/api";
import {setTravelRoutes} from "@/lib/store";

export default function Home() {
    const [isSearching, showSearchBox] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        loadTravelRoutes().then(routes => {
            dispatch(setTravelRoutes(routes));
        });
    }, [dispatch]);

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
                {isSearching && <Suspense fallback={<Spinner>Loading...</Spinner>}>
                    <SearchBox originCities={originCities}
                               destinationCities={destinationCities}
                               handleSearch={() => console.log("search!")} />
                </Suspense>}
                {!isSearching && <Link className={buttonStyles({
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
