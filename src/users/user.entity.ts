import {
  Entity,
  Column,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Report } from '../reports/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ enum: ['user', 'admin'], default: 'user' })
  role: string;

  // Hooks only works on entity instances not on plain object in repository
  @AfterInsert() // Hook
  logInsert() {
    console.log('User document created with id', this.id);
  }

  @AfterUpdate() // Hook
  logUpdate() {
    console.log('User document updated with id', this.id);
  }

  @AfterRemove() // Hook
  logRemove() {
    console.log('User document deleted with id', this.id);
  }

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
