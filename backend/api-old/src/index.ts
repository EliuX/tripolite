import express, {Express, Request, Response} from "express";
import TravelRouteEntity from "./entities/travel-route.entity";


const app: Express = express();

app.use(express.json());

app.get("/travel-routes", async (req: Request, res: Response) => {
    const allTravelRoutes = await TravelRouteEntity.find();
    res.send(allTravelRoutes);
});

export default app;
