import {TravelBookingStatus} from "./models/travel-booking";

export default class ApiRoutes {
    travelRoutes: TravelRoutes;
    travelChoices: TravelChoices;
    travelBookings: TravelBookings;
    constructor(public baseUrl = "") {
        this.travelRoutes = new TravelRoutes(baseUrl + "/travels/routes");
        this.travelChoices = new TravelChoices(baseUrl + "/travels/choices");
        this.travelBookings = new TravelBookings(baseUrl + "/travels/bookings");
    }
}

export class TravelRoutes {
    constructor(public baseUrl = "") {}
}

export class TravelChoices {
    constructor(public baseUrl = "") {
    }

    get search() {
        return `${this.baseUrl}/search`;
    }
}

export class TravelBookings {
    constructor(public baseUrl = "") {
    }
}


