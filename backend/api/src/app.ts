import * as express from "express";
import {Express, Request, Response} from "express";
import {AppDataSource} from "./data-source";
import TravelRouteEntity from "./entities/travel-route.entity";
const app: Express = express();
app.use(express.json());

AppDataSource
    .initialize()
    .then(() => {
        console.log("MongoDB data source initialized!");
    })
    .catch((err: unknown) => {
        console.error("Error during the initialization of the MongoDB data source:", err);
    });

app.get("/travel-routes", async (req: Request, res: Response) => {
    const allTravelRoutes = await TravelRouteEntity.find();
    res.send(allTravelRoutes);
});

export default app;
