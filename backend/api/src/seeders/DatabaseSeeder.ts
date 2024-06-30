import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {TravelRouteSeeder} from "./TravelRouteSeeder";

export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    console.log("Seeding database for the API...");

    return this.call(em, [
      TravelRouteSeeder,
    ]).then(() => {
      console.log("Done seeding database for the API.");
    });
  }
}
