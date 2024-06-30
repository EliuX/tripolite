export default interface TravelRoute {
    originCity: string;
    destinationCity: string;   // The city where the travel ends
    transportation: string;    // The name of the transportation service
    type: string;              // The type of transportation (e.g., Plane, Train)
    price: number;            // The price of the travel
    schedule: string;         // The schedule of the service (e.g., MTW----)
}

