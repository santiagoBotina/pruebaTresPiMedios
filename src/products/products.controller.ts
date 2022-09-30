import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

//TODO recibir token por header
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //Crear Producto
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Request() req) {
    const token = req.headers.auth;
    if (!token) throw new UnauthorizedException();
    return this.productsService.create(createProductDto, token);
  }

  //Listar productos
  @Get()
  findAll() {
    return this.productsService.findAll();
  }
}
