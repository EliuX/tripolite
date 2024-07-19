import {siteConfig} from "@/config/site";
import TravelRoute from "@tripolite/common/models/travel-route";
import TravelChoiceSearchCriteria from "@tripolite/common/models/travel-choice-search-criteria";
import {TravelChoice} from "@tripolite/common/models/travel-choice-model";
import TravelBooking from "@tripolite/common/models/travel-booking";


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


export const submitBookingForm = async (travelBooking: TravelBooking) => {
    return await fetch(siteConfig.apiRoutes.travelBookings.baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(travelBooking)
    }).then(response => response.json() as Promise<TravelBooking>)
}
