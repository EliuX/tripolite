import TravelRoute from "./travel-route";

export type TravelRouteSearchCriteria = Required<Pick<TravelRoute, 'originCity' | 'destinationCity'>>
    & Partial<Pick<TravelRoute, 'transportation'>>;


