import {describe, it} from "@jest/globals";
import app from "../../src/app";
import * as request from "supertest";
import TravelChoiceService from "../../src/services/travel-choice.service";
import {apiRoutes} from "../../src/routes";
import Message from "../../src/shared/message";

describe("Travel Choices API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

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

                    expect(searchSpy).toHaveBeenCalledTimes(1);

                    done();
                });
        });
    });

    it("should handle no search criteria provided", (done) => {
        // Given
        const searchSpy = jest.spyOn(TravelChoiceService, "search").mockResolvedValue([]);

        // When + then
        request(app)
            .get(apiRoutes.travelChoices.search)
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function (err, res) {
                if (err) done(err);

                expect(searchSpy).not.toHaveBeenCalled();
                expect(res.body).toMatchObject(new Message("Invalid search criteria"));

                done();
            });
    });
});

