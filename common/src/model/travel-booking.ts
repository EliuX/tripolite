import TravelChoice from "./travel-choice";
import TravelRoute from "./travel-route";

export enum TravelBookingStatus {
    Pending = 0,
    Confirmed = 1,
}

export default abstract class TravelBooking extends TravelChoice {

    constructor(routes: TravelRoute[]) {
        super(routes);
    }

    get status(): TravelBookingStatus {
        return this.price ? TravelBookingStatus.Confirmed : TravelBookingStatus.Pending;
    }
}
