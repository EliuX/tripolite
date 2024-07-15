import TravelRoute from "./travel-route";
import {TravelChoiceSearchCriteria} from "./travel-choice-search-criteria";
import TravelMethod from "./travel-method";

export default class TravelChoice implements TravelChoiceSearchCriteria {

    originCity: string;
    destinationCity: string;
    transportation?: TravelMethod;

    constructor(searchCriteria: TravelChoiceSearchCriteria, public routes: TravelRoute[]) {
        this.originCity = searchCriteria.originCity;
        this.destinationCity = searchCriteria.destinationCity;
        this.transportation = searchCriteria.transportation;
    }

    get price(): number | undefined {
        if (this.routes.some(r => !(r.price > 0))) {
            return undefined;
        }

        return this.routes.reduce((t, r) => t + r.price, 0);
    }
}
