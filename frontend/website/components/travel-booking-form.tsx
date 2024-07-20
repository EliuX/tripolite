import {TravelBookingModel} from "@tripolite/common/models/travel-booking";
import {useForm} from "react-hook-form";
import {Button} from "@nextui-org/button";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import React from "react";
import clsx from "clsx";
import {Input} from "@nextui-org/input";

export default function TravelBookingForm({travelBooking, handleBooking, readonly}: TravelBookingFormProps) {

    const {
        register,
        handleSubmit,
        formState: {isValid},
    } = useForm<TravelBookingModel>({
        defaultValues: {...travelBooking},
    });

    return <form aria-readonly={readonly} onSubmit={handleSubmit(handleBooking)}>
        <Card className="flex w-250 flex-col flex-wrap md:flex-nowrap gap-4">
            <CardHeader className={clsx("flex flex-col", "text-lg font-semibold")}>
                Payment form
            </CardHeader>
            <CardBody>
                <div className="flex flex-col gap-4">
                    <Card className="flex flex-col gap-4">
                        <CardHeader className="text-md font-semibold">
                            Personal Information
                        </CardHeader>
                        <CardBody className="flex flex-col gap-3">
                            <Input
                                label="Name"
                                placeholder="Enter your name"
                                {...register('personalInfo.name', {required: true, disabled: readonly})}
                            />
                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                {...register('personalInfo.email', {required: true, disabled: readonly})}
                            />
                            <Input
                                label="Phone"
                                placeholder="Enter your phone number"
                                {...register('personalInfo.phone', {required: true, disabled: readonly})}
                            />
                        </CardBody>
                    </Card>
                    <Card className="flex flex-col gap-4">
                        <CardHeader className="text-md font-semibold">
                            Payment Details
                        </CardHeader>
                        <CardBody className="flex flex-col gap-3">
                            <Input
                                label="Card Number"
                                placeholder="Enter your card number"
                                {...register('paymentDetails.cardNumber', {required: true, disabled: readonly})}
                            />
                            <Input
                                label="Expiry Date"
                                placeholder="MM/YY"
                                {...register('paymentDetails.expiry', {required: true, disabled: readonly})}
                            />
                            <Input
                                label="CVV"
                                placeholder="Enter CVV"
                                {...register('paymentDetails.cvv', {required: true, disabled: readonly})}
                            />
                        </CardBody>
                    </Card>
                </div>
            </CardBody>
            <Divider/>
            {!readonly && <CardFooter>
                <Button
                    color="primary"
                    isDisabled={!isValid}
                    radius="none"
                    type="submit"
                >
                    Submit now
                </Button>
            </CardFooter>}
        </Card>
    </form>
}

export interface TravelBookingFormProps {
    readonly: boolean,
    travelBooking: TravelBookingModel;
    handleBooking: (data: TravelBookingModel) => void;
}
