import * as express from "express";
import {Express, Request, Response} from "express";
import TravelRouteEntity from "./entities/travel-route.entity";

const app: Express = express();
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
    res.send("Welcome to the Tripolite API!!");
});

app.get("/travel-routes", async (req: Request, res: Response) => {
    const allTravelRoutes = await TravelRouteEntity.find();
    res.send(allTravelRoutes);
});

export default app;
