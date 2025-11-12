import {
  Entity,
  // ObjectIdColumn,
  Column,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  // Index,
  // ObjectId,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Report } from '../reports/report.entity';

@Entity()
export class User {
  // constructor() {
  //   this.role = 'user';
  // }

  // @ObjectIdColumn()
  // _id: ObjectId;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // @Index({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ enum: ['user', 'admin'], default: 'user' })
  role: string;

  // Hooks only works on entity instances not on plain object in repository
  @AfterInsert() // Hook
  logInsert() {
    // console.log('User document created with id', this._id);
    console.log('User document created with id', this.id);
  }

  @AfterUpdate() // Hook
  logUpdate() {
    // console.log('User document updated with id', this._id);
    console.log('User document updated with id', this.id);
  }

  @AfterRemove() // Hook
  logRemove() {
    // console.log('User document deleted with id', this._id);
    console.log('User document deleted with id', this.id);
  }

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
