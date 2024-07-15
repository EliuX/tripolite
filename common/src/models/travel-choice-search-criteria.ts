import TravelRoute from "./travel-route";

type TravelChoiceSearchCriteria = Required<Pick<TravelRoute, 'originCity' | 'destinationCity'>>
    & Partial<Pick<TravelRoute, 'type'>>;

export default TravelChoiceSearchCriteria;


