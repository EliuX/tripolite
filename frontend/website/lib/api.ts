import {siteConfig} from "@/config/site";
import TravelRoute from "@tripolite/common/models/travel-route";
import TravelChoiceSearchCriteria from "@tripolite/common/models/travel-choice-search-criteria";
import TravelChoice, {TravelChoiceDto} from "@tripolite/common/models/travel-choice";


export const loadTravelRoutes = async () => {
    return await fetch(siteConfig.apiRoutes.travelRoutes.baseUrl)
        .then(response => response.json() as Promise<TravelRoute[]>);
};


export const searchTravelsChoices = async (criteria: TravelChoiceSearchCriteria, offset: number) => {
    const queryParams = new URLSearchParams(criteria);
    queryParams.append('offset', offset.toString());

    return await fetch(`${siteConfig.apiRoutes.travelChoices.search}?${queryParams.toString()}`)
        .then(response => response.json() as Promise<TravelChoiceDto[]>)
};
