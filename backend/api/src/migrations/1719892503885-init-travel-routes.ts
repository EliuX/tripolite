import {MigrationInterface, QueryRunner} from "typeorm";
import TravelRouteEntity from "../entities/travel-route.entity";

export class InitTravelRoutes1719892503885 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return TravelRouteEntity.loadFromCSV('data/TravelAgencyData.csv');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const travelRoutes = await TravelRouteEntity.find();

        await TravelRouteEntity.remove(travelRoutes);

        console.log(`Removed ${travelRoutes.length} travel routes`);
    }
}
