import express, { Express, Request, Response } from "express";
import TravelRoute from "@tripolite/common/model/travel-route";
import appDataSource from "./data-source";

appDataSource
    .initialize()
    .then(() => {
        console.log("MongoDB data source initialized!")
    })
    .catch((err) => {
        console.error("Error during the initialization of the MongoDB data source:", err)
    })

const app: Express = express();
const port = 3000;

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
