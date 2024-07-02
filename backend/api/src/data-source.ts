import {DataSource} from "typeorm"
import {MongoConnectionOptions} from "typeorm/driver/mongodb/MongoConnectionOptions";
import TravelRouteEntity from "./entity/travel-route.entity";

export default new DataSource({
    type: 'mongodb',
    url: "mongodb://localhost:27017/tripolite",
    entities: [
        TravelRouteEntity,
    ],
    migrations: [],
    synchronize: true,
    logging: false,
} as MongoConnectionOptions)
