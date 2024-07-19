import TravelRoute from "./travel-route";
import TravelChoiceSearchCriteria from "./travel-choice-search-criteria";

export default interface TravelChoice {
    paths: TravelRoute[];
    criteria: TravelChoiceSearchCriteria;
}

export class TravelChoiceModel implements TravelChoice, TravelChoiceSearchCriteria {
    static counter = 0;
    id = ++TravelChoiceModel.counter;

    cities: string[];
    public criteria: TravelChoiceSearchCriteria;


    constructor(public paths: TravelRoute[], criteria?: TravelChoiceSearchCriteria) {
        if(criteria) {
            this.criteria = criteria;
        } else {
            this.criteria = {
                originCity: this.paths[0]?.originCity,
                destinationCity: this.paths[0]?.destinationCity,
            }
        }

        this.cities = this.paths.map((route) => route.originCity);
        this.cities.push(this.criteria.destinationCity);
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

    toDto(): TravelChoice {
        return {
            criteria: this.criteria,
            paths: this.paths,
        };
    }
}
