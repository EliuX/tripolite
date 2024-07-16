export default class ApiRoutes {
    travelRoutes: TravelRoutes;
    travelChoices: TravelChoices;
    constructor(public baseUrl = "") {
        this.travelRoutes = new TravelRoutes(baseUrl + "/travel/routes");
        this.travelChoices = new TravelChoices(baseUrl + "/travel/choices");
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
