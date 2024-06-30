import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import * as fs from 'fs';
import csvParser from 'csv-parser';
import TravelRouteEntity from "../entities/travel-route.entity";

export class TravelRouteSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const travelRoutes: Array<any> = [];
    // Read and parse the CSV file
    fs.createReadStream('data/TravelAgencyData.csv')
        .pipe(csvParser())
        .on('data', (row: any) => {
          travelRoutes.push(row);
        })
        .on('end', async () => {
          // Persist each travel route to the database
          for (const travelRoute of travelRoutes) {
            const travelRouteEntity = em.create(TravelRouteEntity, new TravelRouteEntity({
              originCity: travelRoute['Origin City'],
              destinationCity: travelRoute['Destination City'],
              transportation: travelRoute['Transportation'],
              type: travelRoute['Type'],
              price: parseInt(travelRoute['Price']),
              schedule: travelRoute['Schedule'],
            }));

            console.debug("Travel Route Entity:", travelRoute);

            await em.persistAndFlush(travelRouteEntity);
          }

          console.log(`Seeded ${travelRoutes.length} travel routes.`);
        });
  }
}
