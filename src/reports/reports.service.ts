import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ObjectId, DataSource, MongoRepository, Repository } from 'typeorm';

import { Report } from './report.entity';
import { User } from '../users/user.entity';

import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  // ONLY FOR MONGODB
  // private repo: MongoRepository<Report>;
  // constructor(@InjectDataSource() private dataSource: DataSource) {
  //   this.repo = this.dataSource.getMongoRepository(Report);
  // }

  async createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
    const latLngDelta = 5;
    const yearDelta = 3;
    const mileageDelta = 5000;

    return this.repo.createQueryBuilder().select('*').where({
      approved: true,
      make,
      model,
    });

    /* FOR ONLY MONGODB
    const [stats] = await this.repo
      .aggregate([
        {
          $match: {
            approved: true,
            make: make,
            model: model,
            lat: {
              $gte: lat - latLngDelta,
              $lte: lat + latLngDelta,
            },
            lng: {
              $gte: lng - latLngDelta,
              $lte: lng + latLngDelta,
            },
            year: {
              $gte: year - yearDelta,
              $lte: year + yearDelta,
            },
            mileage: {
              $gte: mileage - mileageDelta,
              $lte: mileage + mileageDelta,
            },
          },
        },
        {
          $sort: {
            mileage: -1,
          },
        },
        {
          $limit: 3,
        },
        {
          $group: {
            _id: null,
            averagePrice: { $avg: '$price' },
          },
        },
      ])
      .toArray();

    return { price: stats ? stats.averagePrice : 0 };
    */
  }

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create({ ...reportDto, user });

    return this.repo.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    // const report = await this.repo.findOneBy({ _id: id });
    const report = await this.repo.findOneBy({ id });

    if (!report) {
      throw new NotFoundException('report not found');
    }

    report.approved = approved;
    await this.repo.save(report);

    return report;
  }
}
