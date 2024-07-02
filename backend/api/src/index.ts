import express, { Express, Request, Response } from "express";
import {AppDataSource} from "./data-source.js";
import TravelRouteEntity from "./entity/travel-route.entity.js";

AppDataSource
    .initialize()
    .then(() => {
        console.log("MongoDB data source initialized!")
    })
    .catch((err: unknown) => {
        console.error("Error during the initialization of the MongoDB data source:", err)
    })

const app: Express = express();
const port = 3000;

app.get("/travel-routes", async (req: Request, res: Response) => {
    const allTravelRoutes = await TravelRouteEntity.find();
    res.send(allTravelRoutes);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
