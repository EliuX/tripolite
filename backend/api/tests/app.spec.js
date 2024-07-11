"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const travel_route_entity_1 = require("../src/entities/travel-route.entity");
const globals_1 = require("@jest/globals");
const app_1 = require("../src/app");
const request = require("supertest");
(0, globals_1.describe)("Travel Routes API", () => {
    // beforeAll(async () => {
    //     if(!AppDataSource.isInitialized) {
    //         await AppDataSource.initialize();
    //     }
    // });
    //
    // afterAll(async () => {
    //     await AppDataSource.destroy();
    // });
    (0, globals_1.describe)("GET /travel-routes", () => {
        (0, globals_1.it)("should return all travel routes", (done) => {
            //Given
            const sampleTravelRoutes = [
                new travel_route_entity_1.default({
                    originCity: "CityA",
                    destinationCity: "CityB",
                    transportation: "Plane",
                    type: "Economy",
                    price: 100,
                    schedule: "MTWTFSS",
                }),
                new travel_route_entity_1.default({
                    originCity: "CityC",
                    destinationCity: "CityD",
                    transportation: "Train",
                    type: "First Class",
                    price: 200,
                    schedule: "MTWTFSS",
                }),
                new travel_route_entity_1.default({
                    originCity: "CityE",
                    destinationCity: "CityF",
                    transportation: "Bus",
                    type: "Standard",
                    price: 50,
                    schedule: "MTWTFSS",
                })
            ];
            jest.spyOn(travel_route_entity_1.default, "find").mockResolvedValue(sampleTravelRoutes);
            request(app_1.default)
                .get('/travel-routes')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                if (err)
                    throw err;
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
