import TravelMethod from "@tripolite/common/models/travel-method";
import {BusIcon, PlaneIcon, TrainIcon} from "@/components/icons";
import * as React from "react";
import {IconSvgProps} from "@/types/index";

const TRAVEL_METHODS_ICONS: Record<TravelMethod, React.FC<IconSvgProps>> = {
    Plane: PlaneIcon,
    Train: TrainIcon,
    Bus: BusIcon,
};

export default TRAVEL_METHODS_ICONS;

