import TravelRoute from "@tripolite/common/model/travel-route";
import {BaseEntity} from "./base.entity";
import {Property, Entity} from "@mikro-orm/mongodb";

@Entity()
export default class TravelRouteEntity extends BaseEntity implements TravelRoute {
    @Property()
    originCity: string;

    @Property()
    destinationCity: string;

    @Property()
    transportation: string;

    @Property()
    type: string;

    @Property()
    price: number;

    @Property()
    schedule: string;

    constructor(data: TravelRoute) {
        super();
        this.originCity = data.originCity;
        this.destinationCity = data.destinationCity;
        this.transportation = data.transportation;
        this.type = data.type;
        this.price = data.price;
        this.schedule = data.schedule;
    }
}

