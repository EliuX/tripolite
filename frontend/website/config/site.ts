import ApiRoutes from "@tripolite/common/routes";

export type SiteConfig = typeof siteConfig;

export const apiRoutes = new ApiRoutes("/api");

export const siteConfig = {
    name: "TripOlite",
    description: "A travel agency that will help you to book your next travel",
    navItems: [
        {
            label: "Routes",
            href: "/travel-routes",
        },
        {
            label: "Bookings",
            href: "/bookings",
        },
    ],
    links: {
        github: "https://github.com/EliuX",
        sourceCodeProject: "https://github.com/EliuX/tripolite",
    },
};
