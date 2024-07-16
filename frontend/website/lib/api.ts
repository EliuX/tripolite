import {apiRoutes} from "@/config/site";
import TravelRoute from "@tripolite/common/models/travel-route";


export const loadTravelRoutes = async () => {
    return await fetch(apiRoutes.travelRoutes.baseUrl)
        .then(response => response.json() as Promise<TravelRoute[]>);
};
