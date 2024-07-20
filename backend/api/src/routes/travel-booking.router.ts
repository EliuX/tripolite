import {Request, Response, Router} from "express";
import {TravelBookings} from "@tripolite/common/routes";
import {travelBookingRepository} from "../data-source";
import TravelBooking, {NewTravelBooking} from "@tripolite/common/models/travel-booking";
import TravelBookingEntity from "../entities/travel-booking.entity";

const router: Router = Router();
const travelBookingRoutes = new TravelBookings();

router.put(travelBookingRoutes.baseUrl, async (req: Request<Partial<TravelBooking>>, res: Response) => {
    const data = req.body as Partial<TravelBooking>;
    try {
        if(data.uid) {
            const dataToUpdate = data as Pick<TravelBooking, 'personalInfo' | 'paymentDetails'>
            const result = await travelBookingRepository.save(dataToUpdate)
            res.status(200).send(result);
        } else {
            const dataToInsert = data as Pick<TravelBooking, 'travelChoice'>;
            const result = await travelBookingRepository.save(dataToInsert)
            res.status(201).send(result);
        }
    } catch (e: unknown) {
        res.status(409);
    }
});

router.get(travelBookingRoutes.baseUrl, async (req: Request, res: Response) => {
    const bookings = await travelBookingRepository.find();

    res.send(bookings.map(entity => entity.toDto()));
});

export default router;
