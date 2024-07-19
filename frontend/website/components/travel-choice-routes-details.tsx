import React, {useState} from "react";
import TravelRoute from "@tripolite/common/models/travel-route";
import TRAVEL_METHODS_ICONS from "@/types/travel-method-icons";
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import {price} from "@/components/primitives";

export default function TravelChoiceRoutesDetails({travelRoutes}: TravelChoiceRoutesDetailsProps) {
    const [expandedTravelRoute, _] = useState([travelRoutes[0].uid]);

    return <div className="w-full max-w-[260px]">
        <Accordion isCompact
                   defaultExpandedKeys={expandedTravelRoute}
                   variant="shadow"
                   title="The routes your trip will follow"
                   className={"max-w-xs max-h-[280px] overflow-scroll"}
                   items={travelRoutes}>
            {travelRoutes.map((item, index) => (
                <AccordionItem key={item.uid}
                               aria-label={`Trip #${index + 1}: From ${item.originCity} to ${item.destinationCity}`}
                               title={`${item.originCity} → ${item.destinationCity}`}
                               startContent={TRAVEL_METHODS_ICONS[item.type]({
                                   className: "size-4",
                               })}>
                    <div className="flex gap-2 items-center">
                        <div className="flex flex-col">
                            <span className="text-small text-primary">Company: {item.transportation}</span>
                            <span className="text-tiny text-default-400">Schedule: {item.schedule}</span>
                            <p className={price({class: "text-tiny text-default-400"})}>Price: {item.price ?
                                <strong className="text-primary">{item.price}</strong>
                                : <span title={"You should call the each transporter company before it can be booked"}
                                        className="text-warning cursor-help">{'TBD'}</span>}</p>
                        </div>
                    </div>
                </AccordionItem>
            ))}
        </Accordion>
        <p className={"text-small text-gray-300"}>{travelRoutes.length > 1 ? `You will make ${travelRoutes.length - 1} stops`: `It is a direct ${travelRoutes[0].type === 'Plane' ? 'flight' : 'trip'}!`}</p>
    </div>
}

export interface TravelChoiceRoutesDetailsProps {
    travelRoutes: TravelRoute[];
}
