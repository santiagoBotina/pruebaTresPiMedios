import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, ProductsModule, UsersModule],
  controllers: [],
  providers: [ProductsModule],
})
export class AppModule {}
