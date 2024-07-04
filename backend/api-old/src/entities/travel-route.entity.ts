import TravelRoute from "@tripolite/common/model/travel-route";
import {Column, Entity} from "typeorm"
import fs from "fs";
import csvParser from "csv-parser";
import {BaseEntity} from "./base.entity";

@Entity({name: 'travel-routes'})
export default class TravelRouteEntity extends BaseEntity implements TravelRoute {
    @Column()
    originCity!: string;

    @Column()
    destinationCity!: string;

    @Column()
    transportation!: string;

    @Column()
    type!: string;

    @Column()
    price!: number;

    @Column()
    schedule!: string;

    constructor(data?: TravelRoute) {
        super();

        if (data) {
            this.originCity = data.originCity;
            this.destinationCity = data.destinationCity;
            this.transportation = data.transportation;
            this.type = data.type;
            this.price = data.price;
            this.schedule = data.schedule;
        }
    }

    public static async loadFromCSV(filePath: string) {
        return new Promise<void>(async (resolve, reject) => {
            const travelRoutes: Array<TravelRouteEntity> = [];
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (travelRouteRow: any) => {
                    const travelRouteEntity = new TravelRouteEntity({
                        originCity: travelRouteRow['Origin City'],
                        destinationCity: travelRouteRow['Destination City'],
                        transportation: travelRouteRow['Transportation'],
                        type: travelRouteRow['Type'],
                        price: parseInt(travelRouteRow['Price']),
                        schedule: travelRouteRow['Schedule'],
                    });

                    travelRoutes.push(travelRouteEntity);
                })
                .on('end', async () => {
                    try {
                        console.log(`Loaded ${travelRoutes.length} travel routes from ${filePath}.`);
                        resolve(this.save(travelRoutes)
                            .then(() => console.log(`Successfully saved!`)));
                    } catch (error) {
                        await reject(error);
                    }
                })
                .on('error', reject);
        });
    }
}

