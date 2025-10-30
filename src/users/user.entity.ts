import { Entity, ObjectIdColumn, Column, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('User document created with id', this._id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Document updated with id', this._id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Document deleted with id', this._id);
  }
}
