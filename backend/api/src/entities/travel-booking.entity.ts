import {BaseEntity} from "./base.entity";
import TravelBooking from "@tripolite/common/models/travel-booking";
import {Column, Entity} from "typeorm";
import TravelChoice from "@tripolite/common/models/travel-choice";
import PersonalInfo from "@tripolite/common/models/personal-info";
import PaymentDetails from "@tripolite/common/models/payment-details";
import TravelChoiceEntity from "./travel-choice.entity";
import PaymentDetailsEntity from "./payment-details.entity";
import PersonalInfoEntity from "./personal-info.entity";
import {ObjectId} from "mongodb";

@Entity({name: 'travel-booking'})
export default class TravelBookingEntity extends BaseEntity implements TravelBooking {

    @Column(type => TravelChoiceEntity)
    travelChoice: TravelChoice;

    @Column(type => PersonalInfoEntity)
    personalInfo?: PersonalInfo;

    @Column(type => PaymentDetailsEntity)
    paymentDetails?: PaymentDetails;

    constructor(data?: Partial<TravelBooking>) {
        super();

        if (data) {
            if (data["_id"]) {
                this._id = data["_id"];
            } else if (data.uid) {
                this._id = ObjectId.createFromHexString(data.uid);
            }

            this.travelChoice = data.travelChoice;
            this.personalInfo = data.personalInfo;
            this.paymentDetails = data.paymentDetails;
        }
    }

    get uid(): string {
        return this._id?.toHexString();
    }

    toDto(): TravelBooking {
        return {
            uid: this.uid,
            travelChoice: this.travelChoice,
            personalInfo: this.personalInfo,
            paymentDetails: this.paymentDetails,
        } as TravelBooking;
    }
}
