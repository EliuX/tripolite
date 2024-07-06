import TravelRoute from "./travel-route";

export default abstract class TravelChoice {
    constructor(public routes: TravelRoute[]) {
    }

    get price() : number | undefined {
        if(this.routes.some(r => !(r.price > 0))) {
            return undefined;
        }

        return this.routes.reduce((t, r) => t + r.price, 0);
    }
}
