import "@/styles/globals.css";
import {Metadata, Viewport} from "next";
import clsx from "clsx";

import {Providers} from "./providers";

import {siteConfig} from "@/config/site";
import {fontSans} from "@/config/fonts";
import {Navbar} from "@/components/navbar";
import {Link} from "@nextui-org/link";
import {GithubIcon} from "@/components/icons";

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "/favicon.ico",
    },
};

export const viewport: Viewport = {
    themeColor: [
        {media: "(prefers-color-scheme: light)", color: "white"},
        {media: "(prefers-color-scheme: dark)", color: "black"},
    ],
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {

    return (
        <html suppressHydrationWarning lang="en">
        <head/>
        <body
            className={clsx(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable,
            )}
        >
        <Providers themeProps={{attribute: "class", defaultTheme: "dark"}}>
            <div className="relative flex flex-col h-screen">
                <Navbar/>
                <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                    {children}
                </main>
                <footer className="w-full flex items-center justify-center py-3">
                    <span className="text-default-600">Made by&nbsp;
                        <Link href={siteConfig.links.github} className="text-primary">EliuX</Link>,
                        &nbsp;available in&nbsp;
                    </span>
                    <Link title={"See project in Github"} isExternal aria-label="Github" href={siteConfig.links.sourceCodeProject}>
                        <GithubIcon className="text-default-500" />
                    </Link>
                </footer>
            </div>
        </Providers>
        </body>
        </html>
    );
}
