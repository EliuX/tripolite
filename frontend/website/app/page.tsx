'use client';

import {Link} from "@nextui-org/link";
import {button as buttonStyles} from "@nextui-org/theme";
import {subtitle, title} from "@/components/primitives";
import {Suspense, useState} from "react";
import {Spinner} from "@nextui-org/spinner";
import SearchBox from "@/components/search-box";

export default function Home() {
    const [isSearching, showSearchBox] = useState(false);

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
                    <SearchBox handleSearch={() => console.log("search!")}/>
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
