import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async checkRole(token): Promise<boolean> {
    //Buscar token en db para saber si el usuario es autorizado
    const user = await this.prisma.users.findUnique({
      where: {
        id: token,
      },
      include: {
        Roles: true,
      },
    });
    if (user?.Roles.name !== 'Admin') return false;
    return true;
  }

  async create(createProductDto: CreateProductDto, token: string) {
    const validation = await this.checkRole(token);
    if (validation === false) throw new UnauthorizedException();
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
