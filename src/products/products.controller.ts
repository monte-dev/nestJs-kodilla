import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {
    this.productsService = productsService;
  }

  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }

  @Get('/:id')
  public getById(@Param('id') productId: string) {
    return this.productsService.getById(productId);
  }

  @Delete('/:id')
  public deleteById(@Param('id') productId: string) {
    this.productsService.deleteById(productId);
    return { success: true };
  }
}
