import {Request, Response, Router} from "express";
import {TravelBookings} from "@tripolite/common/routes";
import {travelBookingRepository} from "../data-source";
import {NewTravelBooking} from "@tripolite/common/models/travel-booking";
import TravelBookingEntity from "../entities/travel-booking.entity";

const router: Router = Router();
const travelBookingRoutes = new TravelBookings();

router.post(travelBookingRoutes.baseUrl, async (req: Request<NewTravelBooking>, res: Response) => {
    const {travelChoice} = req.body;

    const count = await travelBookingRepository.countBy({travelChoice});

    if (count > 0) {
        return res.status(409)
            .send({message: "This booking already exists"});
    } else {
        const created = await travelBookingRepository.save(new TravelBookingEntity({travelChoice}));
        res.status(201).send(created.toDto());
    }
});

router.get(travelBookingRoutes.baseUrl, async (req: Request, res: Response) => {
    const bookings = await travelBookingRepository.find();

    res.send(bookings.map(entity => entity.toDto()));
});

export default router;
