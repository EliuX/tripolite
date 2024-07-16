import TravelRouteEntity from "../../src/entities/travel-route.entity";
import {describe, it} from "@jest/globals";
import app from "../../src/app";
import * as request from "supertest";
import {apiRoutes} from "../../src/routes";

describe("Travel Routes API", () => {
    describe("GET /", () => {
        it("should return all travel routes", (done) => {
            //Given
            const sampleTravelRoutes = [
                new TravelRouteEntity({
                    originCity: "CityA",
                    destinationCity: "CityB",
                    transportation: "Plane Company",
                    type: "Plane",
                    price: 100,
                    schedule: "MTWTFSS",
                }),
                new TravelRouteEntity({
                    originCity: "CityC",
                    destinationCity: "CityD",
                    transportation: "First Class Train Company",
                    type: "Train",
                    price: 200,
                    schedule: "MTWTFSS",
                }),
                new TravelRouteEntity({
                    originCity: "CityE",
                    destinationCity: "CityF",
                    transportation: "Standard Bus Company",
                    type: "Bus",
                    price: 50,
                    schedule: "MTWTFSS",
                })
            ];

            jest.spyOn(TravelRouteEntity, "find").mockResolvedValue(sampleTravelRoutes);

            // When + then
            request(app)
                .get(apiRoutes.travelRoutes.baseUrl)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);

                    expect(res.body).toBeInstanceOf(Array);
                    expect(res.body).toHaveLength(sampleTravelRoutes.length);
                    expect(res.body[0].originCity).toBe(sampleTravelRoutes[0].originCity);
                    expect(res.body[0].destinationCity).toBe(sampleTravelRoutes[0].destinationCity);
                    expect(res.body[0].price).toBe(sampleTravelRoutes[0].price);
                    expect(res.body[0].schedule).toBe(sampleTravelRoutes[0].schedule);
                    expect(res.body[0].transportation).toBe(sampleTravelRoutes[0].transportation);
                    expect(res.body[0].type).toBe(sampleTravelRoutes[0].type);

                    done();
                });
        });
    });
});

