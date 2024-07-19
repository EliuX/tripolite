import {DataSource} from "typeorm";
import {MongoConnectionOptions} from "typeorm/driver/mongodb/MongoConnectionOptions";
import TravelRouteEntity from "./entities/travel-route.entity";
import TravelBookingEntity from "./entities/travel-booking.entity";

export const AppDataSource = new DataSource({
    type: 'mongodb',
    url: "mongodb://localhost:27017/tripolite",
    entities: ["./entities/*.js", "src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"],
    synchronize: false,
    logging: true,
} as MongoConnectionOptions);

export const travelRouteRepository = AppDataSource.getMongoRepository(TravelRouteEntity);
export const travelBookingRepository = AppDataSource.getMongoRepository(TravelBookingEntity);
