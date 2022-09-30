import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto, token: string) {
    //Buscar token en db para saber si el usuario es autorizado
    const role = await this.prisma.roles.findUnique({
      where: {
        id: token,
      },
    });
    if (role.name !== 'Admin') throw new UnauthorizedException();
    //Crear producto - recibir dto
    if (!createProductDto) throw new BadRequestException();
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
