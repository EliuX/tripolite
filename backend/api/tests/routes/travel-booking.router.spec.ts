import {describe, it} from "@jest/globals";
import app from "../../src/app";
import * as request from "supertest";
import {apiRoutes} from "../../src/routes";
import {travelBookingRepository} from "../../src/data-source";
import TravelBookingEntity from "../../src/entities/travel-booking.entity";
import TravelBooking from "../../../../common/src/models/travel-booking";

describe("Travel Routes API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("PUT /", () => {
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

        it("should create new booking", (done) => {
            //Given
            const creationEntity = new TravelBookingEntity(creationPayload);
            const saveSpy = jest.spyOn(travelBookingRepository, "save")
                .mockResolvedValue(creationEntity);

            // When + then
            request(app)
                .put(apiRoutes.travelBookings.baseUrl)
                .send(creationPayload)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .end(function (err, res) {
                    if (err) return done(err);

                    expect(res.body).not.toBeUndefined();
                    expect(res.body).not.toBeNull();

                    expect(saveSpy).toHaveBeenCalledTimes(1);

                    return done();
                });
        });

        it("should return updated booking", (done) => {
            //Given
            const updatePayload = {...creationPayload, uid: '668e1a0c9b4440df56ca4c66'};
            const updateEntity = new TravelBookingEntity(updatePayload);
            const saveSpy = jest.spyOn(travelBookingRepository, "save")
                .mockResolvedValue(updateEntity);

            // When + then
            request(app)
                .put(apiRoutes.travelBookings.baseUrl)
                .send(updatePayload)
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) return done(err);

                    expect(saveSpy).toHaveBeenCalledTimes(1);

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

