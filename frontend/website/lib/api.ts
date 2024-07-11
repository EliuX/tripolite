import {siteConfig} from "@/config/site";
import TravelRoute from "@tripolite/common/models/travel-route";


export const loadTravelRoutes = async () => {
    return await fetch(siteConfig.services.api.travelRoutes.path)
            .then(response => response.json() as Promise<TravelRoute[]>);
};
