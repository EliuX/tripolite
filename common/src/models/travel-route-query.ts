import TravelRoute from "./travel-route";

export type TravelRouteQuery = Required<Pick<TravelRoute, 'originCity' | 'destinationCity'>>
    & Partial<Pick<TravelRoute, 'type'>>;
