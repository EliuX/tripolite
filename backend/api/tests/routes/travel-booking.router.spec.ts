import {describe, it} from "@jest/globals";
import app from "../../src/app";
import * as request from "supertest";
import {apiRoutes} from "../../src/routes";
import {travelBookingRepository} from "../../src/data-source";
import TravelBookingEntity from "../../src/entities/travel-booking.entity";
import TravelBooking from "../../../../common/src/models/travel-booking";

describe("Travel Routes API", () => {
    describe("POST /", () => {
        const creationPayload: Partial<TravelBooking> = {
            travelChoice: {
                paths: [{
                    uid: '668e1a0c9b4440df56ca4c14',
                    originCity: 'A',
                    destinationCity: 'B',
                    transportation: 'Plane Company 3',
                    type: 'Train',
                    price: 100,
                    schedule: 'MTWTFSS'
                }, {
                    uid: '668e1a0c9b4440df56ca4c15',
                    originCity: 'B',
                    destinationCity: 'D',
                    transportation: 'Plane Company 4',
                    type: 'Plane',
                    price: 10,
                    schedule: 'MTWTFSS'
                }],
                criteria: {
                    originCity: 'A',
                    destinationCity: 'B',
                    type: 'Train'
                }
            },
        };

        it("should return a 409 if the booking already exists", (done) => {
            //Given
            const countBySpy = jest.spyOn(travelBookingRepository, "countBy").mockResolvedValue(1);

            // When + then
            request(app)
                .post(apiRoutes.travelBookings.baseUrl)
                .send(creationPayload)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(409)
                .end(function (err, res) {
                    if (err) return done(err);

                    expect(countBySpy).toHaveBeenNthCalledWith(1, creationPayload);

                    return done();
                });
        });

        it("should create a new booking if there is no existing booking", (done) => {
            //Given
            jest.spyOn(travelBookingRepository, "countBy").mockResolvedValue(0);
            jest.spyOn(travelBookingRepository, "save").mockResolvedValue(new TravelBookingEntity({
                uid: '668e1a0c9b4440df56ca4c23',
                ...creationPayload
            }));

            // When + then
            request(app)
                .post(apiRoutes.travelBookings.baseUrl)
                .send(creationPayload)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function (err, res) {
                    if (err) return done(err);

                    expect(res.body).not.toBeUndefined();
                    expect(res.body).not.toBeNull();

                    expect(res.body.travelChoice).toMatchObject(creationPayload.travelChoice);

                    return done();
                });
        });
    });

    describe("GET /", () => {
        it('should return all travel bookings', (done) => {
            // Given
            const sampleResultEntities = [new TravelBookingEntity({
                uid: '668e1a0c9b4440df56ca4c55',
                travelChoice: {
                    paths: [{
                        uid: '668e1a0c9b4440df56ca4c14',
                        originCity: 'A',
                        destinationCity: 'B',
                        transportation: 'Plane Company 3',
                        type: 'Train',
                        price: 100,
                        schedule: 'MTWTFSS'
                    }],
                    criteria: {
                        originCity: 'A',
                        destinationCity: 'B',
                        type: 'Train'
                    }
                },
            }),
            ]

            const searchSpy = jest.spyOn(travelBookingRepository, "find").mockResolvedValue(sampleResultEntities);

            // When + then
            request(app)
                .get(apiRoutes.travelBookings.baseUrl)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) done(err);

                    expect(res.body).toHaveLength(1);
                    expect(res.body[0].uid).toBe('668e1a0c9b4440df56ca4c55');
                    expect(res.body[0]._id).toBeUndefined();
                    expect(searchSpy).toHaveBeenCalledTimes(1);

                    done();
                });
        });
    });
});

