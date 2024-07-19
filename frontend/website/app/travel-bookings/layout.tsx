'use client';

import {title} from "@/components/primitives";
import {Button} from "@nextui-org/button";
import {useRouter} from "next/navigation";

export default function BlogLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <h1 className={title({color: "blue"})}>Bookings</h1>
            <section className="inline-block max-w-lg text-center justify-center">
                {children}
            </section>
            <Button onPress={() => router.push('/')}>Go home</Button>
        </section>
    );
}
