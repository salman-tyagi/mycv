import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
