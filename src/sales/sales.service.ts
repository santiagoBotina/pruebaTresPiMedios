import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async checkRole(token): Promise<boolean> {
    //Buscar token en db para saber si el usuario es autorizado
    const role = await this.prisma.roles.findUnique({
      where: {
        id: token,
      },
    });
    if (role.name !== 'Admin') return false;
    return true;
  }

  async create(createSaleDto: CreateSaleDto) {
    //Crear producto - recibir dto
    if (!createSaleDto) throw new BadRequestException();
    const result = await this.prisma.sales.create({
      data: createSaleDto,
    });
    if (!result)
      throw new BadRequestException({
        message: 'No se pudo crear la venta',
      });
    return 'success';
  }

  async findAll() {
    const result = await this.prisma.sales.findMany();
    return result;
  }

  async update(id: string, updateSaleDto: UpdateSaleDto, token: string) {
    const validation = await this.checkRole(token);
    if (validation === false) return new UnauthorizedException();
    const update = await this.prisma.sales.update({
      where: { id },
      data: updateSaleDto,
    });

    if (!update) return new BadRequestException();
    return "User's role updated successfully";
  }

  async remove(id: string, token: string) {
    const validation = await this.checkRole(token);
    if (validation === false) return new UnauthorizedException();

    const result = await this.prisma.sales.delete({
      where: { id },
    });

    if (!result) return new BadRequestException();
    return 'Sale deleted successfully';
  }
}
