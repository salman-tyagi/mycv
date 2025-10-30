import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Report {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  price: number;
}
