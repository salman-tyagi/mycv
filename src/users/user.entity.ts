import {
  Entity,
  ObjectIdColumn,
  Column,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Index,
  ObjectId,
  OneToMany,
} from 'typeorm';

import { Report } from '../reports/report.entity';

@Entity()
export class User {
  constructor() {
    this.role = 'user';
  }

  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ enum: ['user', 'admin'] })
  role: string;

  // Hooks only works on entity instances not on plain object in repository
  @AfterInsert() // Hook
  logInsert() {
    console.log('User document created with id', this._id);
  }

  @AfterUpdate() // Hook
  logUpdate() {
    console.log('User document updated with id', this._id);
  }

  @AfterRemove() // Hook
  logRemove() {
    console.log('User document deleted with id', this._id);
  }

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
