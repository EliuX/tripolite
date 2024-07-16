import {Response, Router} from "express";
import travelChoiceRouter from "./travel-choice.router";
import travelRouteRouter from "./travel-route.router";
import ApiRoutes from "@tripolite/common/routes";

const router: Router = Router();
export const apiRoutes = new ApiRoutes();

router.get(apiRoutes.baseUrl, async (_, res: Response) => {
    res.send("Welcome to the Tripolite API");
});

router.use(apiRoutes.travelRoutes.baseUrl, travelRouteRouter);
router.use(apiRoutes.travelChoices.baseUrl, travelChoiceRouter);

router.use((_, res) => {
    res.sendStatus(404);
});

export default router;
