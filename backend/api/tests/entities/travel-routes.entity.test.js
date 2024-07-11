"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const travel_route_entity_1 = require("../../src/entities/travel-route.entity");
describe('TravelRouteEntity', () => {
    test('convert to TravelRoute', () => {
        const uid = '668e1a0c9b4440df56ca4c04';
        const travelRoute = {
            uid,
            originCity: "CityA",
            destinationCity: "CityB",
            transportation: "Plane",
            type: "Economy",
            price: 100,
            schedule: "MTWTFSS",
        };
        const travelRouteEntity = new travel_route_entity_1.default(travelRoute);
        expect(travelRouteEntity._id.toHexString()).toEqual(uid);
        const entityJSON = JSON.stringify(travelRouteEntity);
        expect(entityJSON).toContain("_id");
        expect(entityJSON).not.toContain("uid");
        const dtoJSON = JSON.stringify(travelRouteEntity.toTravelRoute());
        expect(dtoJSON).toContain("uid");
        expect(dtoJSON).not.toContain("_id");
    });
});
