import {Response, Router} from "express";
import {TravelRoutes} from "@tripolite/common/routes";
import {travelRouteRepository} from "../data-source";

const router: Router = Router();
const travelRoutesRoutes = new TravelRoutes();

router.get(travelRoutesRoutes.baseUrl, async (_, res: Response) => {
    const allTravelRoutes = await travelRouteRepository.find();

    res.send(allTravelRoutes.map(e => e.toDto()));
});
export default router;
