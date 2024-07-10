import * as express from "express";
import {Express, Response} from "express";
import TravelRouteEntity from "./entities/travel-route.entity";

const app: Express = express();
app.use(express.json());

app.get("/", async (_, res: Response) => {
    res.send("Welcome to the Tripolite API!!");
});

app.get("/travel-routes", async (_, res: Response) => {
    const allTravelRoutes = await TravelRouteEntity.find();
    res.send(allTravelRoutes.map(e => e.toTravelRoute()));
});

export default app;
