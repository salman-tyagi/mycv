import { Entity, ObjectIdColumn, Column, ObjectId, ManyToOne } from 'typeorm';

import { User } from '../users/user.entity';

@Entity()
export class Report {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
