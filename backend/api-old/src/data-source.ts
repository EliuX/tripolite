import {DataSource} from "typeorm";
import {MongoConnectionOptions} from "typeorm/driver/mongodb/MongoConnectionOptions";

export const AppDataSource = new DataSource({
    type: 'mongodb',
    url: "mongodb://localhost:27017/tripolite",
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"],
    synchronize: false,
    logging: true,
} as MongoConnectionOptions);
