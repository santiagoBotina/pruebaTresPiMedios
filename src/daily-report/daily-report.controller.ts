import { Controller, Post, Req, UnauthorizedException } from '@nestjs/common';
import { DailyReportService } from './daily-report.service';

@Controller('daily-report')
export class DailyReportController {
  constructor(private readonly dailyReportService: DailyReportService) {}

  @Post('/daily')
  dailyReport(@Req() req) {
    const token = req.headers.auth;
    if (!token) throw new UnauthorizedException();
    return this.dailyReportService.createDaily(token);
  }

  @Post('/monthly')
  monthlyReport(@Req() req) {
    const token = req.headers.auth;
    if (!token) throw new UnauthorizedException();
    return this.dailyReportService.createMonthly(token);
  }
}
