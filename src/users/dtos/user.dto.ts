import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ObjectId } from 'mongodb';

export class UserDto {
  @Expose()
  @Transform(({ obj }) => obj._id?.toString())
  _id: ObjectId;

  @Expose()
  email: string;

  @IsOptional()
  @Expose()
  accessToken: string;
}
