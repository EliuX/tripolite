import TravelChoice from "@tripolite/common/models/travel-choice";
import TravelRoute from "@tripolite/common/models/travel-route";
import {Column} from "typeorm";
import TravelRouteEntity from "./travel-route.entity";


export default class TravelChoiceEntity implements Omit<TravelChoice, 'criteria'> {
    @Column(type => TravelRouteEntity)
    paths: TravelRoute[];
}
