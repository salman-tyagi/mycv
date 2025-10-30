import { Entity, ObjectIdColumn, Column, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  email: string;

  @Column()
  password: string;

  // Hooks only works on entity instances not on plain object in repository
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
