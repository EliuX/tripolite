'use client';

import {title} from "@/components/primitives";
import {useAppSelector} from "@/lib/hooks";
import {selectActiveTravelBooking} from "@/lib/selectors";
import {useEffect, useState} from "react";
import {Button} from "@nextui-org/button";
import {useRouter} from "next/navigation";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const [pageTitle, setPageTitle] = useState('Bookings');
    const activeTravelBooking = useAppSelector(selectActiveTravelBooking);

    const router = useRouter();

    useEffect(() => {
        if(activeTravelBooking) {
            setPageTitle(`Your booking from ${activeTravelBooking.travelChoice.originCity} to ${activeTravelBooking.travelChoice.destinationCity}`);
        } else {
            setPageTitle('No current active bookings');
        }
    }, [activeTravelBooking]);

    return (
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <h1 className={title({color: "blue"})}>{pageTitle}</h1>
          <section className="inline-block max-w-lg text-center justify-center">
              {children}
          </section>
          <section>
              <Button onPress={()=> router.push('/')}>Go home</Button>
          </section>
      </section>
  );
}
