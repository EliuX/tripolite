import TravelChoice, {TravelChoiceModel} from "./travel-choice";
import PersonalInfo from "./personal-info";
import PaymentDetails from "./payment-details";
import {TravelBookings} from "../routes";

export enum TravelBookingStatus {
    Pending = 0,
    Confirmed = 1,
}

export default interface TravelBooking {
    uid: string;
    travelChoice: TravelChoice;
    personalInfo?: PersonalInfo;
    paymentDetails?: PaymentDetails;
}

export type NewTravelBooking = Pick<TravelBooking, 'travelChoice'> | TravelBookings;

export class TravelBookingModel implements TravelBooking {

    constructor(public uid: string,
                public travelChoice: TravelChoiceModel,
                public personalInfo?: PersonalInfo,
                public paymentDetails?: PaymentDetails) {
    }

    get status(): TravelBookingStatus {
        return this.travelChoice.price ? TravelBookingStatus.Confirmed : TravelBookingStatus.Pending;
    }

    toDto(): TravelBooking {
        return {
            uid: this.uid,
            travelChoice: this.travelChoice,
            personalInfo: this.personalInfo,
            paymentDetails: this.paymentDetails,
        };
    }
}
