import React from "react";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {TravelChoiceModel} from "@tripolite/common/models/travel-choice-model";
import {Divider} from "@nextui-org/divider";
import {CircularProgress} from "@nextui-org/progress";
import TRAVEL_METHODS_ICONS from "@/types/travel-method-icons";
import TravelChoiceRoutesDetails from "@/components/travel-choice-routes-details";
import {Button} from "@nextui-org/button";
import DisplayPrice from "@/components/display-price";
import {subtitle} from "@/components/primitives";

export default function TravelChoiceDetails({travelChoice, handleBooking}: TravelChoiceDetailsProps) {
    return <Card className="max-w-[500px]">
        <CardHeader className="flex gap-3">
            <div className="flex flex-row">
                    <span className={subtitle({class: "text-md"})}>Travel
                        between {travelChoice.criteria.originCity} and {travelChoice.criteria.destinationCity}</span>
                <Divider orientation={"vertical"}/>
                {travelChoice.type && <CircularProgress
                    size="sm"
                    title={`${travelChoice.satisfactionRatio * 100}% in ${travelChoice.type}`}
                    aria-label={`${travelChoice.satisfactionRatio * 100}% in ${travelChoice.type}`}
                    value={travelChoice.satisfactionRatio * 100}
                    strokeWidth={2}
                    valueLabel={TRAVEL_METHODS_ICONS[travelChoice.type]({
                        className: "size-4",
                    })}
                    showValueLabel={true}
                    color={travelChoice.satisfactionRatio > 0.5 ? "success" : "warning"}
                />}
            </div>
        </CardHeader>
        <Divider/>
        <CardBody className={"flex flex-col gap-4"}>
            <p>Price: <DisplayPrice
                price={travelChoice.price}
                noPriceTip={"Not all prices included in this choice where declared. You should call the each transporter company before its booked."}/>
            </p>
            <TravelChoiceRoutesDetails travelRoutes={travelChoice.paths}/>
        </CardBody>
        <Divider/>
        {handleBooking && <CardFooter>
            <Button color={'primary'} onPress={() => handleBooking(travelChoice)}>Book now</Button>
        </CardFooter>}
    </Card>
}


export interface TravelChoiceDetailsProps {
    travelChoice: TravelChoiceModel;
    handleBooking?: (_: TravelChoiceModel) => void;
}
