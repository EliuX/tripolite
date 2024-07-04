import request from "supertest";
import TravelRouteEntity from "../src/entities/travel-route.entity";
import app from "../src";


describe("Travel Routes API", () => {

    it("should return all travel routes",  (done) => {
        //Given
        const sampleTravelRoutes = [
            new TravelRouteEntity({
                originCity: "CityA",
                destinationCity: "CityB",
                transportation: "Plane",
                type: "Economy",
                price: 100,
                schedule: "MTWTFSS",
            }),
            new TravelRouteEntity({
                originCity: "CityC",
                destinationCity: "CityD",
                transportation: "Train",
                type: "First Class",
                price: 200,
                schedule: "MTWTFSS",
            }),
            new TravelRouteEntity({
                originCity: "CityE",
                destinationCity: "CityF",
                transportation: "Bus",
                type: "Standard",
                price: 50,
                schedule: "MTWTFSS",
            })
        ];

        jest.spyOn(TravelRouteEntity, "find").mockResolvedValue(sampleTravelRoutes as TravelRouteEntity[]);

        request(app)
            .get('/travel-routes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

