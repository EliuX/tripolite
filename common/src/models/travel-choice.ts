import TravelRoute from "./travel-route";
import TravelChoiceSearchCriteria from "./travel-choice-search-criteria";

export default class TravelChoice implements TravelChoiceSearchCriteria {

    constructor(public paths: TravelRoute[], public criteria: TravelChoiceSearchCriteria) {
    }

    get originCity() {
        return this.criteria.originCity;
    }

    get destinationCity() {
        return this.criteria.destinationCity;
    }

    get type() {
        return this.criteria.type;
    }

    get price(): number | undefined {
        if (this.paths.some(r => !(r.price > 0))) {
            return undefined;
        }

        return this.paths.reduce((t, r) => t + r.price, 0);
    }

    get satisfactionRatio(): number {
        if (!this.type) {
            return 0;
        }

        const preferredCount = this.paths.filter(route => route.type === this.type).length;
        const ratio = preferredCount / this.paths.length;
        return Math.round(ratio * 1000) / 1000;
    }
}
