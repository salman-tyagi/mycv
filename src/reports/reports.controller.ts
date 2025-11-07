import { Body, Controller, Post } from '@nestjs/common';

import { ReportsService } from './reports.service';

import { CreateReportDto } from './dtos/create-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  createReport(@Body() body: CreateReportDto) {
    return this.reportsService.create(body);
  }
}
