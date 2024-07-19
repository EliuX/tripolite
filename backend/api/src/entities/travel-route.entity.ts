import TravelRoute from "@tripolite/common/models/travel-route";
import {Column, Entity} from "typeorm"
import {ObjectId} from 'mongodb';
import {BaseEntity} from "./base.entity";
import TravelMethod from "@tripolite/common/models/travel-method";

@Entity({name: 'travel-routes'})
export default class TravelRouteEntity extends BaseEntity implements TravelRoute {
    @Column()
    originCity!: string;

    @Column()
    destinationCity!: string;

    @Column()
    transportation!: string;

    @Column()
    type!: TravelMethod;

    @Column()
    price!: number;

    @Column()
    schedule!: string;

    constructor(data?: Partial<TravelRouteEntity>) {
        super();

        if (data) {
            if (data["_id"]) {
                this._id = data["_id"];
            } else if (data.uid) {
                this._id = ObjectId.createFromHexString(data.uid);
            }

            this.originCity = data.originCity;
            this.destinationCity = data.destinationCity;
            this.transportation = data.transportation;
            this.type = data.type;
            this.price = data.price;
            this.schedule = data.schedule;
        }
    }

    public toDto(): TravelRoute {
        return {
            uid: this.uid,
            originCity: this.originCity,
            destinationCity: this.destinationCity,
            transportation: this.transportation,
            type: this.type,
            price: this.price,
            schedule: this.schedule,
        } as TravelRoute;
    }

    get uid(): string {
        return this._id?.toHexString();
    }
}

