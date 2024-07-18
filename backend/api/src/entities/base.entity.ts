import {ObjectId} from "mongodb";
import {Column, ObjectIdColumn} from "typeorm";

export abstract class BaseEntity {

    @ObjectIdColumn()
    _id!: ObjectId;

    @Column({insert: true})
    createdAt = new Date();

    @Column({update: true})
    updatedAt = new Date();
}
