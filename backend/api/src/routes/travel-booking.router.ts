import {Request, Response, Router} from "express";
import {TravelBookings} from "@tripolite/common/routes";
import {travelBookingRepository} from "../data-source";
import TravelBooking, {NewTravelBooking} from "@tripolite/common/models/travel-booking";
import TravelBookingEntity from "../entities/travel-booking.entity";

const router: Router = Router();
const travelBookingRoutes = new TravelBookings();

router.put(travelBookingRoutes.baseUrl, async (req: Request<NewTravelBooking | TravelBooking>, res: Response) => {
    const data = req.body as Partial<TravelBooking>;
    const entity = new TravelBookingEntity(data);

    await travelBookingRepository.save(entity)
        .then(result=> {
            res.status(data.uid ? 200 : 201).send(result.toDto());
        })
        .catch((_)=> {
            res.status(409);
        });
});

router.get(travelBookingRoutes.baseUrl, async (req: Request, res: Response) => {
    const bookings = await travelBookingRepository.find();

    res.send(bookings.map(entity => entity.toDto()));
});

export default router;
