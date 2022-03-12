import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { OrderDTO } from 'src/orders/dto/orders.dto';
import { SendGridService } from '@anchan828/nest-sendgrid';


@Injectable()
export class MailService {

    constructor(private mailerService: MailerService, private readonly sendGrid: SendGridService){}

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

        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email</title>
            </head>
            <body>
                <h1>EL usuario ${{userEmail}} ha creado un anuncio</h1>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">place</th>
                            <td>${{place}}</td>
                        </tr>
                        <tr>
                            <th scope="row">business_type</th>
                            <td>${{business_type}}</td>
                        </tr>
                        <tr>
                            <th scope="row">property_type</th>
                            <td>${{property_type}}</td>
                        </tr>
                        <tr>
                            <th scope="row">location_from</th>
                            <td>${{location_from}}</td>
                        </tr>
                        <tr>
                            <th scope="row">location_until</th>
                            <td>${{location_until}}</td>
                        </tr>
                        <tr>
                            <th scope="row">street_from</th>
                            <td>${{street_from}}</td>
                        </tr>
                        <tr>
                            <th scope="row">street_until</th>
                            <td>${{street_until}}</td>
                        </tr>
                        <tr>
                            <th scope="row">location</th>
                            <td>${{location}}</td>
                        </tr>
                        <tr>
                            <th scope="row">street</th>
                            <td>${{street}}</td>
                        </tr>
                        <tr>
                            <th scope="row">year_old_from</th>
                            <td>${{year_old_from}}</td>
                        </tr>
                        <tr>
                            <th scope="row">year_old_until</th>
                            <td>${{year_old_until}}</td>
                        </tr>
                        <tr>
                            <th scope="row">max_price_from</th>
                            <td>${{max_price_from}}</td>
                        </tr>
                        <tr>
                            <th scope="row">max_price_until</th>
                            <td>${{max_price_until}}</td>
                        </tr>
                        <tr>
                            <th scope="row">area_from</th>
                            <td>${{area_from}}</td>
                        </tr>
                        <tr>
                            <th scope="row">area_until</th>
                            <td>${{area_until}}</td>
                        </tr>
                        <tr>
                            <th scope="row">rooms</th>
                            <td>${{rooms}}</td>
                        </tr>
                        <tr>
                            <th scope="row">bathroom</th>
                            <td>${{bathroom}}</td>
                        </tr>
                        <tr>
                            <th scope="row">parking_lot</th>
                            <td>${{parking_lot}}</td>
                        </tr>
                        <tr>
                            <th scope="row">balcony</th>
                            <td>${{balcony}}</td>
                        </tr>
                        <tr>
                            <th scope="row">terrace</th>
                            <td>${{terrace}}</td>
                        </tr>
                        <tr>
                            <th scope="row">deposit</th>
                            <td>${{deposit}}</td>
                        </tr>
                        <tr>
                            <th scope="row">view</th>
                            <td>${{view}}</td>
                        </tr>
                        <tr>
                            <th scope="row">code</th>
                            <td>${{code}}</td>
                        </tr>
                        <tr>
                            <th scope="row">description</th>
                            <td>${{description}}</td>
                        </tr>
                        <tr>
                            <th scope="row">property_type_oldest</th>
                            <td>${{property_type_oldest}}</td>
                        </tr>
                        <tr>
                            <th scope="row">time_to_buy</th>
                            <td>${{time_to_buy}}</td>
                        </tr>
                        <tr>
                            <th scope="row">how_to_pay</th>
                            <td>${{how_to_pay}}</td>
                        </tr>
                        <tr>
                            <th scope="row">need_sell</th>
                            <td>${{need_sell}}</td>
                        </tr>
                        <tr>
                            <th scope="row">estrato</th>
                            <td>${{estrato}}</td>
                        </tr>
                        <tr>
                            <th scope="row">permuta</th>
                            <td>${{permuta}}</td>
                        </tr>
                    </tbody>
                </table>
            </body>
            </html>
        `;

        try {
        return this.sendGrid.send({
            to: ['pleksus.app@gmail.com', 'requerimientos@pleksuscol.com'],
            from: 'pleksus',
            subject: 'Nuevo Anuncio',
            html,
        });
        } catch (e) {
        return e;
        }
    }

}
