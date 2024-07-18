import {MigrationInterface} from "typeorm";
import dataImporterService from "../services/data-importer-service";
import {travelRouteRepository} from "../data-source";

export class InitTravelRoutes1719892503885 implements MigrationInterface {

    public async up(): Promise<void> {
        return dataImporterService.loadTravelRoutes('data/TravelAgencyData.csv');
    }

    public async down(): Promise<void> {
        const travelRoutes = await travelRouteRepository.find();

        await travelRouteRepository.remove(travelRoutes);

        console.log(`Removed ${travelRoutes.length} travel routes`);
    }
}
