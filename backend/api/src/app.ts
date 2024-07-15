import * as express from "express";
import {Express, Response} from "express";
import TravelRouteEntity from "./entities/travel-route.entity";
import {TravelRouteSearchCriteria} from "@tripolite/common/models/travel-route-search-criteria";
import {FindOptionsWhere} from "typeorm/find-options/FindOptionsWhere";

const app: Express = express();
app.use(express.json());

app.get("/", async (_, res: Response) => {
    res.send("Welcome to the Tripolite API!!");
});

app.get("/travel-routes", async (_, res: Response) => {
    const allTravelRoutes = await TravelRouteEntity.find();
    res.send(allTravelRoutes.map(e => e.toTravelRoute()));
});

app.get("/travel-routes/search", async (req, res: Response) => {
    const searchCriteria = req.body as TravelRouteSearchCriteria;

    const allTravelRoutes = await TravelRouteEntity.findBy(
        createQueryFromSearchCriteria(searchCriteria)
    );

    res.send(allTravelRoutes.map(e => e.toTravelRoute()));
});

const createQueryFromSearchCriteria = (searchCriteria: TravelRouteSearchCriteria): FindOptionsWhere<TravelRouteEntity> | undefined => {
    if (searchCriteria.transportation) {
        return {
            transportation: searchCriteria.transportation
        };
    } else {
        return {};
    }
}

app.use((req, res) => {
    res.sendStatus(404);
});

export default app;
