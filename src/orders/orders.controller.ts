import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  NotFoundException,
  ParseUUIDPipe,
  Delete,
  Body,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from 'src/products/dtos/create-order.dto';
import { UpdateOrderDTO } from 'src/products/dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {
    this.ordersService = ordersService;
  }

  @Get('/')
  getAll(): any {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  async getOrderById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.ordersService.getOrderById(id)))
      throw new NotFoundException('Order not found');

    return this.ordersService.getOrderById(id);
  }

  @Delete('/:id')
  async deleteOrderById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.ordersService.getOrderById(id))) {
      throw new NotFoundException('Order not found');
    }
    await this.ordersService.deleteOrderById(id);
    return { success: true };
  }
  @Post('/')
  create(@Body() orderData: CreateOrderDTO) {
    return this.ordersService.create(orderData);
  }

  @Put('/:id:')
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (!(await this.ordersService.getOrderById(id)))
      throw new NotFoundException('Order not found');

    await this.ordersService.updateById(id, orderData);
    return { success: true };
  }
}
