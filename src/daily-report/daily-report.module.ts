import { Module } from '@nestjs/common';
import { DailyReportService } from './daily-report.service';
import { DailyReportController } from './daily-report.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DailyReportController],
  providers: [DailyReportService, PrismaService],
})
export class DailyReportModule {}
