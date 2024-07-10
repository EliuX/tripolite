import TravelRoute from "@tripolite/common/models/travel-route";
import {Column, Entity, ObjectId} from "typeorm"
import {BaseEntity} from "./base.entity";
import * as csvParser from "csv-parser";
import * as fs from "fs";

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

    constructor(data?: Partial<TravelRoute>) {
        super();

        if (data) {
            if(data.uid) {
                this._id = ObjectId.createFromHexString(data.uid);
            }

            this.originCity = data.originCity;
            this.destinationCity = data.destinationCity;
            this.transportation = data.transportation;
            this.type = data.type;
            this.price = data.price;
            this.schedule = data.schedule;
        }
    }

    public static async loadFromCSV(filePath: string) {
        return new Promise<void>( (resolve, reject) => {
            const travelRoutes: TravelRouteEntity[] = [];
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (travelRouteRow: string[]) => {
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

    get uid(): string {
        return this._id.toHexString();
    }
}

