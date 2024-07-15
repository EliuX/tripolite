import {DataSource} from "typeorm";
import {MongoConnectionOptions} from "typeorm/driver/mongodb/MongoConnectionOptions";

export const AppDataSource = new DataSource({
    type: 'mongodb',
    url: "mongodb://localhost:27017/tripolite",
    entities: ["./entities/*.js", "src/entities/*.ts"],
    migrations: ["dist/migrations/*.js"],
    synchronize: false,
    logging: true,
} as MongoConnectionOptions);
