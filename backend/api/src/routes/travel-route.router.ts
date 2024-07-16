import {Response, Router} from "express";
import TravelRouteEntity from "../entities/travel-route.entity";
import {TravelRoutes} from "@tripolite/common/routes";

const router: Router = Router();
const travelRoutesRoutes = new TravelRoutes();

router.get(travelRoutesRoutes.baseUrl, async (_, res: Response) => {
    const allTravelRoutes = await TravelRouteEntity.find();

    res.send(allTravelRoutes.map(e => e.toTravelRoute()));
});
export default router;
