import {Response, Router} from "express";
import TravelChoiceSearchCriteria from "@tripolite/common/models/travel-choice-search-criteria";
import travelChoiceService from "../services/travel-choice.service";
import {TravelChoices} from "@tripolite/common/routes";


const router: Router = Router();
const travelChoicesRoutes = new TravelChoices();

router.get(travelChoicesRoutes.search, async (req, res: Response) => {
    const searchCriteria = req.query as TravelChoiceSearchCriteria;

    if(searchCriteria?.originCity && searchCriteria.destinationCity) {
        const result = await travelChoiceService.search(searchCriteria);

        res.send(result);
    } else {
        res.status(400).send({ message: "Invalid search criteria"});
    }
});

export default router;
