import {
  Entity,
  ObjectIdColumn,
  Column,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Index,
} from 'typeorm';
import { ObjectId } from 'mongodb';
// import { Exclude, Transform } from 'class-transformer';

@Entity()
export class User {
  // @Transform(({ value }) => value?.toString()) // To convert the BSON type to JSON during transform
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  // @Exclude() // Transform entity into plain object, remove password field then convert to JSON
  password: string;

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
}
