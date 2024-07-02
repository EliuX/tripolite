import TravelRoute from "@tripolite/common/model/travel-route";
import {BaseEntity, Column, Entity} from "typeorm"
import fs from "fs";
import csvParser from "csv-parser";

@Entity({name: 'travel-routes'})
export default class TravelRouteEntity extends BaseEntity implements TravelRoute {
    @Column()
    originCity: string;

    @Column()
    destinationCity: string;

    @Column()
    transportation: string;

    @Column()
    type: string;

    @Column()
    price: number;

    @Column()
    schedule: string;

    constructor(data: TravelRoute) {
        super();
        this.originCity = data.originCity;
        this.destinationCity = data.destinationCity;
        this.transportation = data.transportation;
        this.type = data.type;
        this.price = data.price;
        this.schedule = data.schedule;
    }

    public static async loadFromCSV(filePath: string) {
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
                travelRoutes.forEach(TravelRouteEntity.save.bind);
                console.log(`Seeded ${travelRoutes.length} travel routes.`);
            });
    }
}

