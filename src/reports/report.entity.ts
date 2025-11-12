// import { Entity, ObjectIdColumn, Column, ObjectId, ManyToOne } from 'typeorm';
import { Entity, PrimaryGeneratedColumn, Column, ObjectId, ManyToOne } from 'typeorm';

import { User } from '../users/user.entity';

@Entity()
export class Report {
  // Set default values if using mongodb
  // constructor() {
  //   this.approved = false;
  // }

  // @ObjectIdColumn()
  // _id: ObjectId;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  approved: boolean;

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
