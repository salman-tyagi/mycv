import { ObjectId } from 'typeorm';
import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  // @Transform(({ obj }) => obj._id)
  // _id: ObjectId;
  id: number;

  @Expose()
  approved: boolean;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  mileage: number;

  @Expose()
  lat: number;

  @Expose()
  lng: number;

  @Expose()
  // @Transform(({ obj }) => obj.user._id)
  // user: ObjectId;
  @Transform(({ obj }) => obj.user.id)
  user: number;
}
