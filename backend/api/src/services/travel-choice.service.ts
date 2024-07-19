import TravelRoute from "@tripolite/common/models/travel-route";
import TravelChoiceSearchCriteria from "@tripolite/common/models/travel-choice-search-criteria";
import TravelChoice, {TravelChoiceModel} from "@tripolite/common/models/travel-choice";
import Paginable, {DEFAULT_LIMIT, DEFAULT_OFFSET} from "@tripolite/common/paginable";
import {travelRouteRepository} from "../data-source";

class TravelChoiceService {
    public async search(criteria: TravelChoiceSearchCriteria, paginable?: Partial<Paginable>): Promise<TravelChoiceModel[]> {
        const routes: TravelRoute[] = await travelRouteRepository.find()
            .then(result => result.map(e => e.toDto()));

        const results = this.findAllPaths(routes, criteria);

        const {startPosition, endPosition} = this.parsePaginable(paginable);
        return results
            .slice(startPosition, Math.min(endPosition, results.length));
    }

    parsePaginable(paginable?: Partial<Paginable>) {
        const startPosition = parseInt((paginable?.offset ?? DEFAULT_OFFSET).toString());
        const endPosition = startPosition + parseInt((paginable?.limit ?? DEFAULT_LIMIT).toString());

        return {startPosition, endPosition};
    }

    private findAllPaths(routes: TravelRoute[], criteria: TravelChoiceSearchCriteria): TravelChoiceModel[] {
        const graph = this.buildGraph(routes);
        const paths: TravelRoute[][] = [];
        const visited = new Set<string>();

        const dfs = (currentCity: string, path: TravelRoute[]) => {
            if (currentCity === criteria.destinationCity) {
                paths.push([...path]);
                return;
            }

            visited.add(currentCity);

            const neighbors = graph.get(currentCity) || [];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor.destinationCity)) {
                    dfs(neighbor.destinationCity, [...path, neighbor]);
                }
            }

            visited.delete(currentCity);
        };

        dfs(criteria.originCity, []);

        const travelChoices = this.convertToTravelChoices(paths, criteria);
        return this.rankTravelChoices(travelChoices, criteria);
    }

    private buildGraph(routes: TravelRoute[]): Map<string, TravelRoute[]> {
        const graph = new Map<string, TravelRoute[]>();

        for (const route of routes) {
            if (!graph.has(route.originCity)) {
                graph.set(route.originCity, []);
            }

            graph.get(route.originCity)?.push(route);
        }

        return graph;
    }

    private rankTravelChoices(travelChoices: TravelChoiceModel[], criteria: TravelChoiceSearchCriteria): TravelChoiceModel[] {
        travelChoices.sort((a, b) => {
            if (b.satisfactionRatio !== a.satisfactionRatio) {
                return b.satisfactionRatio - a.satisfactionRatio;
            }

            return a.paths.length - b.paths.length;
        });

        return travelChoices;
    }

    private convertToTravelChoices(paths: TravelRoute[][], criteria: TravelChoiceSearchCriteria): TravelChoiceModel[] {
        return paths.map(pathArray => new TravelChoiceModel(pathArray, criteria));
    }
}

export default new TravelChoiceService();
