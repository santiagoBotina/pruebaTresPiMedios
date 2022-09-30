import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateRoleDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
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

  async create(createUserDto: CreateUserDto, token: string) {
    const validation = await this.checkRole(token);
    if (validation === false) return new UnauthorizedException();
    //Crear usuario - recibir dto
    if (!createUserDto) throw new BadRequestException();
    const result = await this.prisma.users.create({
      data: createUserDto,
    });
    if (!result)
      throw new BadRequestException({
        message: 'No se pudo crear el usuario',
      });
    return 'success';
  }

  async findAll(token: string) {
    const validation = await this.checkRole(token);
    if (validation === false) return new UnauthorizedException();

    const result = await this.prisma.users.findMany();
    return result;
  }

  async updateRole(id: string, updateUserDto: UpdateRoleDto, token: string) {
    const validation = await this.checkRole(token);
    if (validation === false) return new UnauthorizedException();

    const update = await this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });

    if (!update) return new BadRequestException();
    return "User's role updated successfully";
  }

  async remove(id: string, token: string) {
    const validation = await this.checkRole(token);
    if (validation === false) return new UnauthorizedException();

    const result = await this.prisma.users.delete({
      where: { id },
    });

    if (!result) return new BadRequestException();
    return 'User deleted successfully';
  }
}
