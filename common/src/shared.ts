import TravelMethod from "./models/travel-method";
import {TravelBookingModel, TravelBookingStatus} from "./models/travel-booking";

export const NO_PRICE_STR = 'TBD';


export const describeConnections = (numberOfCtronnections: number, travelMethod: TravelMethod) => numberOfCtronnections > 1
    ? `You will make ${numberOfCtronnections - 1} stops`
    : `It is a ${travelMethod === 'Plane' ? 'direct flight' : 'single trip'}!`;


export const isBookingCompleted = (travelBookingModel: TravelBookingModel) => {
    if (travelBookingModel.status === TravelBookingStatus.Pending) {
        return false;
    }

    if (!(travelBookingModel.personalInfo?.name
        && travelBookingModel.personalInfo.email
        && travelBookingModel.personalInfo.phone)) {
        return false;
    }

    if (!(travelBookingModel.paymentDetails?.cvv
        && travelBookingModel.paymentDetails.expiry
        && travelBookingModel.paymentDetails.cardNumber)) {
        return false;
    }

    return true;
};
