import * as csvParser from 'csv-parser';
import * as fs from 'fs';
import TravelRouteEntity from "../entities/travel-route.entity";
import TravelMethod from "@tripolite/common/models/travel-method";

export class DataImporterService {
    private cvsParser: csvParser.CsvParser;
    constructor() {
        this.cvsParser = csvParser();
    }
    public async loadTravelRoutes(filePath: string) {
        return new Promise<void>((resolve, reject) => {
            const travelRoutes: TravelRouteEntity[] = [];

            fs.createReadStream(filePath)
                .pipe(this.cvsParser)
                .on('data', (travelRouteRow: string[]) => {
                    const travelRouteEntity = new TravelRouteEntity({
                        originCity: travelRouteRow['Origin City'],
                        destinationCity: travelRouteRow['Destination City'],
                        transportation: travelRouteRow['Transportation'],
                        type: travelRouteRow['Type'] as TravelMethod,
                        price: parseInt(travelRouteRow['Price']),
                        schedule: travelRouteRow['Schedule'],
                    });

                    travelRoutes.push(travelRouteEntity);
                })
                .on('end', async () => {
                    try {
                        console.log(`Loaded ${travelRoutes.length} travel routes from ${filePath}.`);
                        resolve(TravelRouteEntity.save(travelRoutes)
                            .then(() => console.log(`Successfully saved!`)));
                    } catch (error) {
                        reject(error);
                    }
                })
                .on('error', reject);
        });
    }
}

export default new DataImporterService();