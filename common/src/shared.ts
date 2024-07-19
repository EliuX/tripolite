import TravelMethod from "./models/travel-method";

export const NO_PRICE_STR = 'TBD';


export const describeConnections = (numberOfCtronnections: number, travelMethod: TravelMethod)  => numberOfCtronnections > 1
      ? `You will make ${numberOfCtronnections - 1} stops`
      : `It is a ${travelMethod === 'Plane' ? 'direct flight' : 'single trip'}!`;
