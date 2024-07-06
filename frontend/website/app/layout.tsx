
import type {Metadata} from "next";
import Link from 'next/link';
import "./globals.css";

export const metadata: Metadata = {
    title: "TripOlite",
    description: "Travel Agency as interview code",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>TripOlite - Travel Agency</title>
        <body>
        <h1>TripOlite - Travel Agency </h1>
        <nav>
            <ul>
                <li><Link href="/travel-routes">
                    View Routes
                </Link></li>
                <li><Link href="/travel-routes/search">
                    Search Routes
                </Link></li>
                <li><Link href="/bookings">
                    Your Bookings
                </Link></li>
            </ul>
        </nav>
        <main>{children}</main>
        <footer>© 2024 TripOlite</footer>
        </body>
        </html>
    );
}
