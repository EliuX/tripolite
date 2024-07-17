import TravelChoiceSearchCriteria from "../../../../common/src/models/travel-choice-search-criteria";
import TravelRoute from "../../../../common/src/models/travel-route";
import TravelRouteEntity from "../../src/entities/travel-route.entity";
import TravelChoiceService from "../../src/services/travel-choice.service";


jest.mock("../../src/entities/travel-route.entity");
describe('TravelChoiceService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('search for Paths', () => {
        const basicMockRoutes: TravelRoute[] = [
            {
                uid: '1',
                originCity: 'A',
                destinationCity: 'B',
                transportation: 'Train Company',
                type: 'Train',
                price: 50,
                schedule: 'MTWTFSS'
            },
            {
                uid: '2',
                originCity: 'B',
                destinationCity: 'C',
                transportation: 'Bus Company',
                type: 'Bus',
                price: 30,
                schedule: 'MTWTFSS'
            },
            {
                uid: '3',
                originCity: 'A',
                destinationCity: 'C',
                transportation: 'Plane Company',
                type: 'Plane',
                price: 100,
                schedule: 'MTWTFSS'
            },
        ];

        it('should return all paths from origin to destination prioritizing ' +
            'the shortest path when no type is specified', async () => {
            // Given
            (TravelRouteEntity.find as jest.Mock).mockResolvedValue(basicMockRoutes);

            const criteria: TravelChoiceSearchCriteria = {
                originCity: 'A',
                destinationCity: 'C'
            };

            // When
            const results = await TravelChoiceService.search(criteria);

            // Then
            expect(results).toHaveLength(2);

            expect(results[0].paths).toHaveLength(1); // A -> C by plane
            expect(results[0].paths[0]).toBe(basicMockRoutes[2]);

            expect(results[1].paths).toHaveLength(2); // A -> B -> C by train
            expect(results[1].paths[0]).toBe(basicMockRoutes[0]);
            expect(results[1].paths[1]).toBe(basicMockRoutes[1]);
        });

        describe("With a relatively large set of routes", () => {
            // Given
            const mockRoutes: TravelRoute[] = [
                ...basicMockRoutes,
                {
                    uid: '11',          // Completes A - B - C - D (0.3%) and A - C - D (100%)
                    originCity: 'C',
                    destinationCity: 'D',
                    transportation: 'Plane Company 2',
                    type: 'Plane',
                    price: 50,
                    schedule: 'MTWTFSS'
                },
                {
                    uid: '12',          // Should be ignored
                    originCity: 'B',
                    destinationCity: 'A',
                    transportation: 'Plane Company',
                    type: 'Bus',
                    price: 30,
                    schedule: 'MTWTFSS'
                },
                {
                    uid: '13',          // Shortest path at 100% type match (Top choice)
                    originCity: 'A',
                    destinationCity: 'D',
                    transportation: 'Plane Company 2',
                    type: 'Plane',
                    price: 50,
                    schedule: 'MTWTFSS'
                },
                {
                    uid: '14',          // Shortest path at 0% type match
                    originCity: 'A',
                    destinationCity: 'D',
                    transportation: 'Plane Company 3',
                    type: 'Train',
                    price: 100,
                    schedule: 'MTWTFSS'
                },
                {
                    uid: '15',           // A - B - D (50%)
                    originCity: 'B',
                    destinationCity: 'D',
                    transportation: 'Plane Company 4',
                    type: 'Plane',
                    price: 10,
                    schedule: 'MTWTFSS'
                },
            ];

            const criteria: TravelChoiceSearchCriteria = {
                originCity: 'A',
                destinationCity: 'D',
                type: 'Plane',
            };

            beforeAll(()=> {
                (TravelRouteEntity.find as jest.Mock).mockResolvedValue(mockRoutes);
            });

            it('should return 5 choices prioritized by the preferred transportation type and the shortest path', async () => {
                // When
                const results = await TravelChoiceService.search(criteria);

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

            it("should return the 3 first entries when limit=3", async()=> {
                // When
                const results = await TravelChoiceService.search(criteria, {limit: 3});

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

            it("should return the last 2 entries when offset=3", async()=> {
                // When
                const results = await TravelChoiceService.search(criteria, {offset: 3});

                // Then
                expect(results).toHaveLength(2);

                // Last choice
                expect(results[1].paths).toHaveLength(1);
                expect(results[1].satisfactionRatio).toBe(0);
                expect(results[1].paths[0].uid).toEqual("14");
            });

            it("should return the last item entries when offset=4 and limit=1", async()=> {
                // When
                const results = await TravelChoiceService.search(criteria, {limit: 1, offset: 4});

                // Then
                expect(results).toHaveLength(1);

                // The Last choice is the only choice
                expect(results[0].paths).toHaveLength(1);
                expect(results[0].satisfactionRatio).toBe(0);
                expect(results[0].paths[0].uid).toEqual("14");
            });
        });

        it('should handle no routes found', async () => {
            (TravelRouteEntity.find as jest.Mock).mockResolvedValue([]);

            const criteria: TravelChoiceSearchCriteria = {
                originCity: 'A',
                destinationCity: 'C'
            };
            const results = await TravelChoiceService.search(criteria);

            expect(results).toHaveLength(0);
        });
    });
});
