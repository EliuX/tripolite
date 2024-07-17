export default class ApiRoutes {
    travelRoutes: TravelRoutes;
    travelChoices: TravelChoices;
    constructor(public baseUrl = "") {
        this.travelRoutes = new TravelRoutes(baseUrl + "/travels/routes");
        this.travelChoices = new TravelChoices(baseUrl + "/travels/choices");
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
