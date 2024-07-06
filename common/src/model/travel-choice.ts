import TravelRoute from "./travel-route";

export default abstract class TravelChoice {
    constructor(public routes: TravelRoute[]) {
    }

    get price() : number | undefined {
        return this.routes
            .map(p => p ?? p > 0 ? p : undefined)
            .reduce((t, p) => t + p, 0);
    }
}
