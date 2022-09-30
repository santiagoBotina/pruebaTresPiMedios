import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateRoleDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Request() req) {
    const token = req.headers.auth;
    if (!token) throw new UnauthorizedException();
    return this.usersService.create(createUserDto, token);
  }

  @Get()
  findAll(@Request() req) {
    const token = req.headers.auth;
    if (!token) throw new UnauthorizedException();
    return this.usersService.findAll(token);
  }

  @Patch(':id')
  updateRole(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateRoleDto,
    @Request() req,
  ) {
    const token = req.headers.auth;
    if (!token) throw new UnauthorizedException();
    return this.usersService.updateRole(id, updateUserDto, token);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const token = req.headers.auth;
    if (!token) throw new UnauthorizedException();
    return this.usersService.remove(id, token);
  }
}
