import React from "react";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import TravelChoice from "@tripolite/common/models/travel-choice";
import {Divider} from "@nextui-org/divider";
import {price, subtitle} from "@/components/primitives";
import {CircularProgress} from "@nextui-org/progress";
import TRAVEL_METHODS_ICONS from "@/types/travel-method-icons";
import TravelChoiceRoutesDetails from "@/components/travel-choice-routes-details";

export default function TravelChoiceDetails({travelChoice}: TravelChoiceDetailsProps) {
    return <Card className="max-w-[500px]">
        <CardHeader className="flex gap-3">
            <div className="flex flex-row">
                    <span className={subtitle({class: "text-md"})}>Travel
                        between {travelChoice.criteria.originCity} and {travelChoice.criteria.destinationCity}</span>
                <Divider orientation={"vertical"}/>
                {travelChoice.type && <CircularProgress
                    size="sm"
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
            <p className={price()}>Price: {travelChoice.price ?
                <strong className="text-primary">{travelChoice.priceStr}</strong>
                : <span title={"You should call the each transporter company before it can be booked"}
                        className="text-warning">{travelChoice.priceStr}</span>}</p>
            <TravelChoiceRoutesDetails travelRoutes={travelChoice.paths}/>
        </CardBody>
        <Divider/>
        <CardFooter className={"text-small"}>
            <p>You will make {travelChoice.cities.length - 1} stop(s)</p>
        </CardFooter>
    </Card>
}


export interface TravelChoiceDetailsProps {
    travelChoice: TravelChoice;
}
