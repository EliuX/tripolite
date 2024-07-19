import React from "react";
import {NO_PRICE_STR} from "@tripolite/common/constants";
import {priceContainer} from "@/components/primitives";
import TravelChoiceModel from "@tripolite/common/models/travel-choice-model";
import {Tooltip} from "@nextui-org/tooltip";

export default function DisplayPrice({
                                         price,
                                         noPriceTip
                                     }: DisplayPriceProps) {
    return price ? <span className={priceContainer({class: "text-success-600"})}>${price}</span>
        : <Tooltip content={noPriceTip ?? "You should call the each transporter company before it can be booked"}>
            <span className="text-warning cursor-help">{NO_PRICE_STR}</span>
        </Tooltip>
}

export type DisplayPriceProps = Pick<TravelChoiceModel, "price"> & {
    noPriceTip?: string
};