import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OrderDTO } from 'src/orders/dto/orders.dto';
import { OrdersService } from 'src/orders/orders.service';
import { FavoritosService } from './favoritos.service';

@Controller('api/favorite')
export class FavoritesController {
    constructor(private readonly orderService: OrdersService, private favoriteService: FavoritosService) {}
    @Post('/:idOrder/user/:id')
    @UseGuards(JwtAuthGuard)
    async createFavotite(@Param('idOrder') idOrder: string,  @Param('id') idUser: string) {
        const order = await this.orderService.findOne(idOrder);
        const { status, place, business_type, property_type, location_from,
                location_until, street_from, street_until, location, street, 
                year_old_from, year_old_until, max_price_from, max_price_until,
                area_from, area_until, rooms, bathroom, parking_lot, balcony,
                terrace, view, property_type_oldest, time_to_buy, how_to_pay,
                need_sell, description, deposit, estrato, permuta,code,
                
        } = order;
        let favorites = {
            status, place, business_type, property_type, location_from,
            location_until, street_from, street_until, location, street, 
            year_old_from, year_old_until, max_price_from, max_price_until,
            area_from, area_until, rooms, bathroom, parking_lot, balcony,
            terrace, view, property_type_oldest, time_to_buy, how_to_pay,
            need_sell, description, deposit, estrato, permuta,code, idUser,
            idOrder
        }

        favorites.idUser = idUser;

        if(order){
            return this.favoriteService.createFavorites(favorites);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('user/:id')
    async getAllFavorites(@Param('id') id: string){
        const listFavorite =   (await this.favoriteService.findAll())
        return listFavorite.filter(favoritos => favoritos.idUser == id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.favoriteService.delete(id);
    }
}
