import {MigrationInterface, QueryRunner} from "typeorm";
import TravelRouteEntity from "../entity/travel-route.entity.js";

export class InitTravelRoutes1719892503885 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return TravelRouteEntity.loadFromCSV('data/TravelAgencyData.csv');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const travelRoutes = await TravelRouteEntity.find();

        for (let i = 0; i < travelRoutes.length; i++) {
            await travelRoutes[i].remove();
        }

        console.log(`Removed ${travelRoutes.length} travel routes`);
    }
}
