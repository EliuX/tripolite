    import TravelMethod from "./travel-method";

    export default interface TravelRoute {
        uid: string;                    // The unique identifier of the travel route
        originCity: string;             // The city where the travel starts
        destinationCity: string;        // The city where the travel ends
        transportation: TravelMethod;   // The name of the transportation service
        type: string;                   // The type of transportation (e.g., Plane, Train)
        price: number;                  // The price of the travel
        schedule: string;               // The schedule of the service (e.g., MTW----)
    }

