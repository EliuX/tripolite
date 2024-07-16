import {MigrationInterface} from "typeorm";
import TravelRouteEntity from "../entities/travel-route.entity";
import dataImporterService from "../services/data-importer-service";

export class InitTravelRoutes1719892503885 implements MigrationInterface {

    public async up(): Promise<void> {
        return dataImporterService.loadTravelRoutes('data/TravelAgencyData.csv');
    }

    public async down(): Promise<void> {
        const travelRoutes = await TravelRouteEntity.find();

        await TravelRouteEntity.remove(travelRoutes);

        console.log(`Removed ${travelRoutes.length} travel routes`);
    }
}
