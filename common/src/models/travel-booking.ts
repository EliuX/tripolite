import TravelChoice from "./travel-choice";
import TravelRoute from "./travel-route";

export enum TravelBookingStatus {
    Pending = 0,
    Confirmed = 1,
}

export default class TravelBooking extends TravelChoice {

    get status(): TravelBookingStatus {
        return this.price ? TravelBookingStatus.Confirmed : TravelBookingStatus.Pending;
    }
}
