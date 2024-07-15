import TravelRouteEntity from "../../src/entities/travel-route.entity";
import TravelRoute from "@tripolite/common/models/travel-route";


describe('TravelRouteEntity', () => {
    test('convert to TravelRoute', () => {
        const uid = '668e1a0c9b4440df56ca4c04';

        const travelRoute = {
            uid,
            originCity: "CityA",
            destinationCity: "CityB",
            transportation: "Economic Plane Company",
            type: "Plane",
            price: 100,
            schedule: "MTWTFSS",
        } as TravelRoute;


        const travelRouteEntity = new TravelRouteEntity(travelRoute);

        expect(travelRouteEntity._id.toHexString()).toEqual(uid);

        const entityJSON = JSON.stringify(travelRouteEntity);
        expect(entityJSON).toContain("_id");
        expect(entityJSON).not.toContain("uid");

        const dtoJSON = JSON.stringify(travelRouteEntity.toTravelRoute());
        expect(dtoJSON).toContain("uid");
        expect(dtoJSON).not.toContain("_id");
    });
});
