import express, { Express, Request, Response } from "express";
import TravelRoute from "@tripolite/common/dm/travel-route";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/travel-routes/example", (req: Request, res: Response) => {
    const example = {
        originCity: "New York",
        destinationCity: "Los Angeles",
        transportation: "American Airlines",
        type: "Plane",
        price: 500,
        schedule: "MTWTFSS"
    } as TravelRoute;

    res.send(example);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
