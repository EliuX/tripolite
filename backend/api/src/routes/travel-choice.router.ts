import {Response, Router} from "express";
import TravelChoiceSearchCriteria from "@tripolite/common/models/travel-choice-search-criteria";
import travelChoiceService from "../services/travel-choice.service";

const router: Router = Router();
router.get("/search", async (req, res: Response) => {
    const searchCriteria = req.query as TravelChoiceSearchCriteria;

    const result = await travelChoiceService.search(searchCriteria);

    res.send(result);
});

export default router;
