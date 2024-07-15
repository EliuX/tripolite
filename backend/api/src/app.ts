import * as express from "express";
import {Express, Response} from "express";
import TravelRouteEntity from "./entities/travel-route.entity";
import {TravelChoiceSearchCriteria} from "@tripolite/common/models/travel-choice-search-criteria";
import TravelChoiceService from "./services/travel-choice.service";

const app: Express = express();
app.use(express.json());

app.get("/", async (_, res: Response) => {
    res.send("Welcome to the Tripolite API!!");
});

app.get("/travel-routes", async (_, res: Response) => {
    const allTravelRoutes = await TravelRouteEntity.find();
    res.send(allTravelRoutes.map(e => e.toTravelRoute()));
});

app.get("/travel-choices/search", async (req, res: Response) => {
    const searchCriteria = req.body as TravelChoiceSearchCriteria;

    return await TravelChoiceService.search(searchCriteria);
});

app.use((req, res) => {
    res.sendStatus(404);
});

export default app;
