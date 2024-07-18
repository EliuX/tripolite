import React from "react";
import TravelRoute from "@tripolite/common/models/travel-route";
import {Listbox, ListboxItem} from "@nextui-org/listbox";
import TRAVEL_METHODS_ICONS from "@/types/travel-method-icons";

export default function TravelChoiceRoutesDetails({travelRoutes}: TravelChoiceRoutesDetailsProps) {
    return <div
        className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
        <Listbox
            classNames={{
                base: "max-w-xs",
                list: "max-h-[280px] overflow-scroll",
            }}
            items={travelRoutes}
            label="The routes your trip will follow"
            selectionMode="none"
            variant="flat"
            bottomContent={travelRoutes.length > 1 && <p className={"text-small text-gray-300"}>You will make {travelRoutes.length - 1} stop(s)</p>}
        >
            {(item) => (
                <ListboxItem key={item.uid}
                             textValue={`From ${item.originCity} to ${item.destinationCity}`}
                    startContent={TRAVEL_METHODS_ICONS[item.type]({
                        className: "size-4",
                    })}
                >
                    <div className="flex gap-2 items-center">
                        <div className="flex flex-col">
                            <span className="text-small">Company: {item.transportation}</span>
                            <span className="text-tiny text-default-400">Schedule: {item.schedule}</span>
                        </div>
                    </div>
                </ListboxItem>
            )}
        </Listbox>
    </div>
}

export interface TravelChoiceRoutesDetailsProps {
    travelRoutes: TravelRoute[];
}
