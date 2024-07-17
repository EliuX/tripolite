import TravelRouteEntity from "../entities/travel-route.entity";
import TravelRoute from "@tripolite/common/models/travel-route";
import TravelChoiceSearchCriteria from "@tripolite/common/models/travel-choice-search-criteria";
import TravelChoice from "@tripolite/common/models/travel-choice";

class TravelChoiceService {
    public async search(criteria: TravelChoiceSearchCriteria): Promise<TravelChoice[]> {
        const routes = await TravelRouteEntity.find();

        return this.findAllPaths(routes, criteria);
    }

    /**
     * Searches for all paths from the origin city to the destination city using Depth-First Search (DFS)
     * @generated using ChatGPT-4
     * @param routes The routes in the database available to do the graph search
     * @param criteria
     */
    private findAllPaths(routes: TravelRoute[], criteria: TravelChoiceSearchCriteria): TravelChoice[] {
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
        return this.rankPaths(paths, criteria);
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

    private rankPaths(paths: TravelRoute[][], criteria: TravelChoiceSearchCriteria): TravelChoice[] {
        const travelChoices = this.convertToTravelChoices(paths, criteria);

        travelChoices.sort((a, b) => {
            if (b.satisfactionRatio !== a.satisfactionRatio) {
                return b.satisfactionRatio - a.satisfactionRatio;
            }

            return a.paths.length - b.paths.length;
        });

        return travelChoices;
    }

    private convertToTravelChoices(paths: TravelRoute[][], criteria: TravelChoiceSearchCriteria): TravelChoice[] {
        return paths.map(pathArray => new TravelChoice(pathArray, criteria));
    }
}

export default new TravelChoiceService();
