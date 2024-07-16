import {Response, Router} from "express";
import TravelRouteEntity from "../entities/travel-route.entity";

const router: Router = Router();

router.get("/", async (_, res: Response) => {
    const allTravelRoutes = await TravelRouteEntity.find();

    res.send(allTravelRoutes.map(e => e.toTravelRoute()));
});
export default router;
