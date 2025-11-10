import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';

import { Report } from './report.entity';
import { User } from '../users/user.entity';

import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create({ ...reportDto, user });

    return this.repo.save(report);
  }

  async changeApproval(id: ObjectId, approved: boolean) {
    const report = await this.repo.findOneBy({ _id: id });

    if (!report) {
      throw new NotFoundException('report not found');
    }

    report.approved = approved;
    await this.repo.save(report);

    return report;
  }
}
