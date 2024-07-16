import {describe, it} from "@jest/globals";
import app from "../../src/app";
import * as request from "supertest";
import TravelChoiceService from "../../src/services/travel-choice.service";
import {apiRoutes} from "../../src/routes";

describe("Travel Choices API", () => {
    describe("GET /search", () => {
        it('should search for travel choices with the given criteria', (done) => {
            // Given
            const searchSpy = jest.spyOn(TravelChoiceService, "search").mockResolvedValue([]);

            // When + then
            request(app)
                .get(apiRoutes.travelChoices.search)
                .query({
                    originCity: "CityA",
                    destinationCity: "CityB",
                    type: "Plane"
                })
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);

                    expect(searchSpy).toHaveBeenNthCalledWith(1, {
                        originCity: "CityA",
                        destinationCity: "CityB",
                        type: "Plane"
                    });

                    done();
                });
        });
    });
});

