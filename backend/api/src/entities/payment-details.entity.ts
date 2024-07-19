import PaymentDetails from "@tripolite/common/models/payment-details";
import {Column} from "typeorm";

export default class PaymentDetailsEntity implements PaymentDetails {

    @Column()
    cardNumber: string;


    @Column()
    expiry: string;


    @Column()
    cvv: string;
}
