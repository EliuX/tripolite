import TravelChoiceSearchCriteria from "../../../../common/src/models/travel-choice-search-criteria";
import TravelRouteEntity from "../../src/entities/travel-route.entity";
import travelChoiceService from "../../src/services/travel-choice.service";
import Paginable, {DEFAULT_OFFSET} from "../../../../common/src/paginable";
import {travelRouteRepository} from "../../src/data-source";


jest.mock("../../src/entities/travel-route.entity");
describe('TravelChoiceService', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('search for Paths', () => {
        const basicMockRoutes = [
            new TravelRouteEntity({
                uid: '1',
                originCity: 'A',
                destinationCity: 'B',
                transportation: 'Train Company',
                type: 'Train',
                price: 50,
                schedule: 'MTWTFSS'
            }),
            new TravelRouteEntity({
                uid: '2',
                originCity: 'B',
                destinationCity: 'C',
                transportation: 'Bus Company',
                type: 'Bus',
                price: 30,
                schedule: 'MTWTFSS'
            }),
            new TravelRouteEntity({
                uid: '3',
                originCity: 'A',
                destinationCity: 'C',
                transportation: 'Plane Company',
                type: 'Plane',
                price: 100,
                schedule: 'MTWTFSS'
            }),
        ];

        xit('should return all paths from origin to destination prioritizing ' +
            'the shortest path when no type is specified', async () => {
            // Given
            (travelRouteRepository.find as jest.Mock).mockResolvedValue(basicMockRoutes);

            const criteria: TravelChoiceSearchCriteria = {
                originCity: 'A',
                destinationCity: 'C'
            };

            // When
            const results = await travelChoiceService.search(criteria);

            // Then
            expect(results).toHaveLength(2);

            expect(results[0].paths).toHaveLength(1); // A -> C by plane
            expect(results[0].paths[0]).toBe(basicMockRoutes[2]);

            expect(results[1].paths).toHaveLength(2); // A -> B -> C by train
            expect(results[1].paths[0]).toBe(basicMockRoutes[0]);
            expect(results[1].paths[1]).toBe(basicMockRoutes[1]);
        });

        xdescribe("With a relatively large set of routes", () => {
            // Given
            const mockRoutes: TravelRouteEntity[] = [
                ...basicMockRoutes,
                new TravelRouteEntity({
                    uid: '11',          // Completes A - B - C - D (0.3%) and A - C - D (100%)
                    originCity: 'C',
                    destinationCity: 'D',
                    transportation: 'Plane Company 2',
                    type: 'Plane',
                    price: 50,
                    schedule: 'MTWTFSS'
                }),
                new TravelRouteEntity({
                    uid: '12',          // Should be ignored
                    originCity: 'B',
                    destinationCity: 'A',
                    transportation: 'Plane Company',
                    type: 'Bus',
                    price: 30,
                    schedule: 'MTWTFSS'
                }),
                new TravelRouteEntity({
                    uid: '13',          // Shortest path at 100% type match (Top choice)
                    originCity: 'A',
                    destinationCity: 'D',
                    transportation: 'Plane Company 2',
                    type: 'Plane',
                    price: 50,
                    schedule: 'MTWTFSS'
                }),
                new TravelRouteEntity({
                    uid: '14',          // Shortest path at 0% type match
                    originCity: 'A',
                    destinationCity: 'D',
                    transportation: 'Plane Company 3',
                    type: 'Train',
                    price: 100,
                    schedule: 'MTWTFSS'
                }),
                new TravelRouteEntity({
                    uid: '15',           // A - B - D (50%)
                    originCity: 'B',
                    destinationCity: 'D',
                    transportation: 'Plane Company 4',
                    type: 'Plane',
                    price: 10,
                    schedule: 'MTWTFSS'
                }),
            ];

            const criteria: TravelChoiceSearchCriteria = {
                originCity: 'A',
                destinationCity: 'D',
                type: 'Plane',
            };

            beforeAll(() => {
                jest.spyOn(travelRouteRepository, "find").mockResolvedValue(mockRoutes);
            });

            it('should return 5 choices prioritized by the preferred transportation type and the shortest path', async () => {
                // When
                const results = await travelChoiceService.search(criteria);

                // Then
                expect(results).toHaveLength(5);

                // Shortest route
                expect(results[0].paths).toHaveLength(1);
                expect(results[0].satisfactionRatio).toEqual(1);
                expect(results[0].paths[0].uid).toEqual("13");

                // Second choice
                expect(results[1].paths).toHaveLength(2);
                expect(results[1].satisfactionRatio).toEqual(1);
                expect(results[1].price).toEqual(150);
                expect(results[1].paths[0].uid).toEqual("3");
                expect(results[1].paths[1].uid).toEqual("11");

                // Third choice
                expect(results[2].paths).toHaveLength(2);
                expect(results[2].satisfactionRatio).toEqual(0.5);
                expect(results[2].price).toEqual(60);
                expect(results[2].paths[0].uid).toEqual("1");
                expect(results[2].paths[1].uid).toEqual("15");

                // Last choice
                expect(results[4].paths).toHaveLength(1);
                expect(results[4].satisfactionRatio).toBe(0);
                expect(results[4].paths[0].uid).toEqual("14");
            });

            it("should return the 3 first entries when limit=3", async () => {
                // When
                const results = await travelChoiceService.search(criteria, {limit: 3});

                // Then
                expect(results).toHaveLength(3);

                // Shortest route
                expect(results[0].paths).toHaveLength(1);
                expect(results[0].satisfactionRatio).toEqual(1);
                expect(results[0].paths[0].uid).toEqual("13");

                // Second choice
                expect(results[1].paths).toHaveLength(2);
                expect(results[1].satisfactionRatio).toEqual(1);
                expect(results[1].price).toEqual(150);
                expect(results[1].paths[0].uid).toEqual("3");
                expect(results[1].paths[1].uid).toEqual("11");

                // Last choice
                expect(results[2].paths).toHaveLength(2);
                expect(results[2].satisfactionRatio).toEqual(0.5);
                expect(results[2].price).toEqual(60);
                expect(results[2].paths[0].uid).toEqual("1");
                expect(results[2].paths[1].uid).toEqual("15");
            });

            it("should return the last 2 entries when offset=3", async () => {
                // When
                const results = await travelChoiceService.search(criteria, {offset: 3});

                // Then
                expect(results).toHaveLength(2);

                // Last choice
                expect(results[1].paths).toHaveLength(1);
                expect(results[1].satisfactionRatio).toBe(0);
                expect(results[1].paths[0].uid).toEqual("14");
            });

            it("should return the last item entries when offset=4 and limit=1", async () => {
                // When
                const results = await travelChoiceService.search(criteria, {limit: 1, offset: 4});

                // Then
                expect(results).toHaveLength(1);

                // The Last choice is the only choice
                expect(results[0].paths).toHaveLength(1);
                expect(results[0].satisfactionRatio).toBe(0);
                expect(results[0].paths[0].uid).toEqual("14");
            });
        });

        it('should handle no routes found', async () => {
            jest.spyOn(travelRouteRepository, "find").mockResolvedValue([]);

            const criteria: TravelChoiceSearchCriteria = {
                originCity: 'A',
                destinationCity: 'C'
            };
            const results = await travelChoiceService.search(criteria);

            expect(results).toHaveLength(0);
        });


        describe('parsePaginable', () => {
            it('should return default positions when paginable is undefined', () => {
                const {startPosition, endPosition} = travelChoiceService.parsePaginable();

                expect(startPosition).toBe(0);
                expect(endPosition).toBe(100);
            });

            it('should return positions based on provided offset and limit', () => {
                const paginable = {offset: 5, limit: 15};
                const {startPosition, endPosition} = travelChoiceService.parsePaginable(paginable);

                expect(startPosition).toBe(5);
                expect(endPosition).toBe(20);
            });

            it('should return positions with default offset when only limit is provided', () => {
                const paginable = {limit: 20};
                const {startPosition, endPosition} = travelChoiceService.parsePaginable(paginable);

                expect(startPosition).toBe(DEFAULT_OFFSET);
                expect(endPosition).toBe(DEFAULT_OFFSET + 20);
            });

            it('should return positions with default limit when only offset is provided', () => {
                const paginable = {offset: 10};
                const {startPosition, endPosition} = travelChoiceService.parsePaginable(paginable);

                expect(startPosition).toBe(10);
                expect(endPosition).toBe(110);
            });

            it('should handle edge case when limit is zero', () => {
                const paginable = {offset: 10, limit: 0};
                const {startPosition, endPosition} = travelChoiceService.parsePaginable(paginable);

                expect(startPosition).toBe(10);
                expect(endPosition).toBe(10);
            });

            it('should handle edge case when offset is negative', () => {
                const paginable = {offset: -5, limit: 10};
                const {startPosition, endPosition} = travelChoiceService.parsePaginable(paginable);

                expect(startPosition).toBe(-5);
                expect(endPosition).toBe(5);
            });

            it('should handle edge case when limit is negative', () => {
                const paginable = {offset: 10, limit: -10};
                const {startPosition, endPosition} = travelChoiceService.parsePaginable(paginable);

                expect(startPosition).toBe(10);
                expect(endPosition).toBe(0);
            });

            it('should parse correctly the pagination if it is a string', () => {
                const paginable = JSON.parse("{ \"offset\": \"100\", \"limit\": \"100\" }") as Paginable;

                const {startPosition, endPosition} = travelChoiceService.parsePaginable(paginable);

                expect(startPosition).toBe(100);
                expect(endPosition).toBe(200);
            });
        });
    });
});
