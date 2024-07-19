import {siteConfig} from "@/config/site";
import TravelRoute from "@tripolite/common/models/travel-route";
import TravelChoiceSearchCriteria from "@tripolite/common/models/travel-choice-search-criteria";
import TravelChoice from "@tripolite/common/models/travel-choice";
import TravelBooking, {NewTravelBooking} from "@tripolite/common/models/travel-booking";


export const loadTravelRoutes = async () => {
    return await fetch(siteConfig.apiRoutes.travelRoutes.baseUrl)
        .then(response => response.json() as Promise<TravelRoute[]>);
};


export const searchTravelsChoices = async (criteria: TravelChoiceSearchCriteria, offset: number) => {
    const queryParams = new URLSearchParams(criteria);
    queryParams.append('offset', offset.toString());

    return await fetch(`${siteConfig.apiRoutes.travelChoices.search}?${queryParams.toString()}`)
        .then(response => response.json() as Promise<TravelChoice[]>)
};


export const createOrUpdateTravelBooking = async (travelBooking: NewTravelBooking | TravelBooking) => {
    return await fetch(siteConfig.apiRoutes.travelBookings.baseUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(travelBooking)
    }).then(response => response.json() as Promise<TravelBooking>)
}

export const loadTravelBookings = async () => {
    return await fetch(siteConfig.apiRoutes.travelBookings.baseUrl)
        .then(response => response.json() as Promise<TravelBooking[]>);
};
