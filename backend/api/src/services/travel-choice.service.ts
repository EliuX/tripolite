import TravelRouteEntity from "../entities/travel-route.entity";
import TravelChoice from "@tripolite/common/models/travel-choice";
import TravelRoute from "@tripolite/common/models/travel-route";
import TravelChoiceSearchCriteria from "@tripolite/common/models/travel-choice-search-criteria";

class TravelChoiceService {
    public async search(criteria: TravelChoiceSearchCriteria): Promise<TravelChoice[]> {
        const {originCity, destinationCity, type} = criteria;

        let query = TravelRouteEntity.createQueryBuilder("travelRoute");

        if (type) {
            query = query.andWhere("travelRoute.transportation = :transportation", {type});
        }

        const routes = await query.getMany();

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
        return this.convertToTravelChoices(paths, criteria);
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

    private convertToTravelChoices(paths: TravelRoute[][], criteria: TravelChoiceSearchCriteria): TravelChoice[] {
        return paths.map(pathArray => new TravelChoice(criteria, pathArray));
    }
}

export default new TravelChoiceService();
