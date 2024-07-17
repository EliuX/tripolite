import {siteConfig} from "@/config/site";
import TravelRoute from "@tripolite/common/models/travel-route";
import TravelChoiceSearchCriteria from "@tripolite/common/models/travel-choice-search-criteria";
import TravelChoice from "@tripolite/common/models/travel-choice";


export const loadTravelRoutes = async () => {
    return await fetch(siteConfig.apiRoutes.travelRoutes.baseUrl)
        .then(response => response.json() as Promise<TravelRoute[]>);
};


export const searchTravelsChoices = async (criteria: TravelChoiceSearchCriteria) => {
    const queryString = new URLSearchParams(criteria).toString();

    return await fetch(`${siteConfig.apiRoutes.travelChoices.search}?${queryString}`)
        .then(response => response.json() as Promise<TravelChoice[]>)
};
