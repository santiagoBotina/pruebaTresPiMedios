import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    const result = await this.prisma.products.create({
      data: createProductDto,
    });
    if (!result)
      throw new BadRequestException({
        message: 'No se pudo crear el producto',
      });
    return 'success';
  }

  async findAll() {
    const result = await this.prisma.products.findMany();
    return result;
  }
}
