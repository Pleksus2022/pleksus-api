import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { OrderDTO } from 'src/orders/dto/orders.dto';


@Injectable()
export class MailService {

    constructor(private mailerService: MailerService){}

    async sendEmailCreateOrder({
        place,
        business_type,
        property_type,
        location_from,
        location_until,
        street_from,
        street_until,
        location,
        street,
        year_old_from,
        year_old_until,
        max_price_from,
        max_price_until,
        area_from,
        area_until,
        rooms,
        bathroom,
        parking_lot,
        balcony,
        terrace,
        deposit,
        view,
        code,
        description,
        property_type_oldest,
        time_to_buy,
        how_to_pay,
        need_sell,
        estrato,
        permuta,
        status}: OrderDTO, 
        userEmail: string){
        
        try{
            await this.mailerService.sendMail({
                to: ['pleksus.app@gmail.com', 'requerimientos@pleksuscol.com'],
                template: '/email-order-create',
                context: {
                    place,
                    business_type,
                    property_type,
                    location_from,
                    location_until,
                    street_from,
                    street_until,
                    location,
                    street,
                    year_old_from,
                    year_old_until,
                    max_price_from,
                    max_price_until,
                    area_from,
                    area_until,
                    rooms,
                    bathroom,
                    parking_lot,
                    balcony,
                    terrace,
                    deposit,
                    view,
                    code,
                    description,
                    property_type_oldest,
                    time_to_buy,
                    how_to_pay,
                    need_sell,
                    estrato,
                    permuta,
                    status,
                    userEmail  
                }
            });
        }catch(e){
            return e
        }
        
    }

}
