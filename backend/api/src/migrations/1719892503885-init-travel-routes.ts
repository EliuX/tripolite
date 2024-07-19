import {MigrationInterface} from "typeorm";
import dataImporterService from "../services/data-importer-service";
import {travelRouteRepository} from "../data-source";

export class InitTravelRoutes1719892503885 implements MigrationInterface {

    public async up(): Promise<void> {
        return dataImporterService.loadTravelRoutes('data/TravelAgencyData.csv');
    }

    public async down(): Promise<void> {
        const travelRoutesCount = await travelRouteRepository.countDocuments();

        if(travelRoutesCount > 0) {
            await travelRouteRepository.clear();
        }

        console.log(`Removed ${travelRoutesCount} travel routes`);
    }
}
