import {Response, Router} from "express";
import travelChoiceRouter from "./travel-choice.router";
import travelRouteRouter from "./travel-route.router";
import TravelRouteEntity from "../entities/travel-route.entity";

const router: Router = Router();

router.get("/", async (_, res: Response) => {
    res.send("Welcome to the Tripolite API");
});

router.use('/travel-routes', travelRouteRouter);
router.use('/travel-choices', travelChoiceRouter);

router.use((_, res) => {
    res.sendStatus(404);
});

export default router;
