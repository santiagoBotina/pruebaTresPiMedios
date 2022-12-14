import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { SalesModule } from './sales/sales.module';
import { DailyReportModule } from './daily-report/daily-report.module';

@Module({
  imports: [PrismaModule, ProductsModule, UsersModule, SalesModule, DailyReportModule],
  controllers: [],
  providers: [ProductsModule],
})
export class AppModule {}
