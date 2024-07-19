import {TravelChoiceModel} from "./travel-choice-model";
import PersonalInfo from "./personal-info";
import PaymentDetails from "./payment-details";
import TravelChoice from "./travel-choice-model";

export enum TravelBookingStatus {
    Pending = 0,
    Confirmed = 1,
}

export default interface TravelBooking {
    travelChoice: TravelChoice;
    personalInfo?: PersonalInfo;
    paymentDetails?: PaymentDetails;
}

export class TravelBookingModel implements TravelBooking {

    constructor(public travelChoice: TravelChoiceModel,
                public personalInfo?: PersonalInfo,
                public paymentDetails?: PaymentDetails) {
    }

    get status(): TravelBookingStatus {
        return this.travelChoice.price ? TravelBookingStatus.Confirmed : TravelBookingStatus.Pending;
    }

    toDto(): TravelBooking {
        return {
            travelChoice: this.travelChoice,
            personalInfo: this.personalInfo,
            paymentDetails: this.paymentDetails,
        };
    }
}
