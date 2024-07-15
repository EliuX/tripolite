import {ObjectId} from "mongodb";
import {BaseEntity as TypeOrmBaseEntity, Column, ObjectIdColumn} from "typeorm";

export abstract class BaseEntity extends TypeOrmBaseEntity {

    @ObjectIdColumn()
    _id!: ObjectId;

    @Column({insert: true})
    createdAt = new Date();

    @Column({update: true})
    updatedAt = new Date();
}
