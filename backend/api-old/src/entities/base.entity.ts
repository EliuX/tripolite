import {BaseEntity as MongoBaseEntity, Column, ObjectId, ObjectIdColumn, PrimaryGeneratedColumn} from "typeorm"


export abstract class BaseEntity extends MongoBaseEntity {

    @ObjectIdColumn()
    _id!: ObjectId;

    @Column({insert: true})
    createdAt = new Date();

    @Column({update: true})
    updatedAt = new Date();
}
