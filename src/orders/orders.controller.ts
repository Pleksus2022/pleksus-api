import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { stringify } from 'querystring';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { uniqueId } from 'src/common/helpers/helpers';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { OrderDTO } from './dto/orders.dto';
import { OrderUpdateDTO } from './dto/ordersUpdate.dto';
import { OrdersService } from './orders.service';
import { Order } from './schemas/orders.schema';

@ApiTags('orders')
@Controller('api/orders')
export class OrdersController { 
  
  constructor(
    private readonly orderService: OrdersService, 
    private userService: UsersService,
    private mailService: MailService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('populate')
  findAllWihtPopulate(){
    return this.orderService.findAllWithPopulate()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Get('findByUser/:userId')
  @UseGuards(JwtAuthGuard)
  async findByUserId(@Param('userId') userId: string) {
    const result = await this.orderService.findAll();
    return result.filter((order: any) => order.user == userId);
  }

  //orderDTO.code = `${UniqueIdSell()}` + `${correlativo}`;
  @Post()
  // @UseGuards(JwtAuthGuard)
  async create(@Body() orderDTO: OrderDTO) {
    if(orderDTO.business_type.includes('Sell')){
      const correlativo = await this.orderService.correlativo();
      orderDTO.code = uniqueId('C-000000', correlativo);
    }else if(orderDTO.business_type.includes('toLease')){
      
      const correlativo = await this.orderService.correlativo();
      orderDTO.code =  orderDTO.code = uniqueId('A-000000', correlativo);
    }
    const order = await  this.orderService.create(orderDTO);
    if(order.user){
      const user = await this.userService.findOne(orderDTO.user);
      await this.mailService.sendEmailCreateOrder(orderDTO, user.username, user.phone)
    }
    return order
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() order: OrderUpdateDTO) {
    return this.orderService.update(id, order);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.orderService.delete(id);
  }
}
