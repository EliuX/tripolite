import {TravelChoiceSearchCriteria} from "@tripolite/common/models/travel-choice-search-criteria";
import TravelRoute from "@tripolite/common/models/travel-route";
import TravelRouteEntity from "../../src/entities/travel-route.entity";
import TravelChoiceService from "../../src/services/travel-choice.service";

// Mocking TravelRouteEntity
jest.mock('../entities/travel-route.entity');

describe('TravelChoiceService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('search for Paths', () => {
        it('should return all paths from origin to destination', async () => {
            // Given
            const mockRoutes: TravelRoute[] = [
                {
                    uid: '1',
                    originCity: 'A',
                    destinationCity: 'B',
                    transportation: 'Train Company',
                    type: 'Train',
                    price: 50,
                    schedule: 'MTW----'
                },
                {
                    uid: '2',
                    originCity: 'B',
                    destinationCity: 'C',
                    transportation: 'Train Company',
                    type: 'Train',
                    price: 30,
                    schedule: '---T--S'
                },
                {
                    uid: '3',
                    originCity: 'A',
                    destinationCity: 'C',
                    transportation: 'Train Company',
                    type: 'Plane',
                    price: 100,
                    schedule: '-----FS'
                },
                {
                    uid: '4',
                    originCity: 'C',
                    destinationCity: 'A',
                    transportation: 'Plane Company',
                    type: 'Plane',
                    price: 100,
                    schedule: '-----FS'
                },
            ];

            (TravelRouteEntity.createQueryBuilder as jest.Mock).mockReturnValue({
                andWhere: jest.fn().mockReturnThis(),
                getMany: jest.fn().mockResolvedValue(mockRoutes),
            });

            const criteria: TravelChoiceSearchCriteria = {
                originCity: 'A',
                destinationCity: 'C'
            };

            // When
            const results = await TravelChoiceService.search(criteria);

            // Then
            expect(results).toHaveLength(2);

            expect(results[0].routes).toHaveLength(2); // A -> B -> C by train
            expect(results[0].routes[1].type).toBe('Train');

            expect(results[1].routes).toHaveLength(1); // A -> C by plane
            expect(results[0].routes[1].type).toBe('Plane');
        });

        it('should filter by transportation type', async () => {
            const mockRoutes: TravelRoute[] = [
                {
                    uid: '1',
                    originCity: 'A',
                    destinationCity: 'B',
                    transportation: 'Train Company',
                    type: 'Train',
                    price: 50,
                    schedule: 'MTW----'
                },
                {
                    uid: '2',
                    originCity: 'B',
                    destinationCity: 'C',
                    transportation: 'Bus Company',
                    type: 'Bus',
                    price: 30,
                    schedule: '---T--S'
                },
                {
                    uid: '3',
                    originCity: 'A',
                    destinationCity: 'C',
                    transportation: 'Plane Company',
                    type: 'Plane',
                    price: 100,
                    schedule: '-----FS'
                },
            ];

            (TravelRouteEntity.createQueryBuilder as jest.Mock).mockReturnValue({
                andWhere: jest.fn().mockReturnThis(),
                getMany: jest.fn().mockResolvedValue(mockRoutes),
            });

            const criteria: TravelChoiceSearchCriteria = {
                originCity: 'A',
                destinationCity: 'C',
                transportation: 'Plane'
            };
            const results = await TravelChoiceService.search(criteria);

            expect(results).toHaveLength(1);
            expect(results[0].routes).toHaveLength(1);
            expect(results[0].routes[0].transportation).toBe('Plane');
        });

        it('should handle no routes found', async () => {
            (TravelRouteEntity.createQueryBuilder as jest.Mock).mockReturnValue({
                andWhere: jest.fn().mockReturnThis(),
                getMany: jest.fn().mockResolvedValue([]),
            });

            const criteria: TravelChoiceSearchCriteria = {
                originCity: 'A',
                destinationCity: 'C',
                transportation: undefined
            };
            const results = await TravelChoiceService.search(criteria);

            expect(results).toHaveLength(0);
        });
    });
});
