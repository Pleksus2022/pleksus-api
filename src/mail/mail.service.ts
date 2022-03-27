import { Injectable } from '@nestjs/common';
import { OrderDTO } from '../orders/dto/orders.dto';
import { SendGridService } from '@anchan828/nest-sendgrid';


@Injectable()
export class MailService {

    constructor(private readonly sendGrid: SendGridService){}

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
        userEmail: string,
        phone: any){

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
                <h1>EL usuario ${userEmail} ha creado un anuncio</h1>
                <p>Número de contacto: ${phone}</p>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Lugar</th>
                            <td>${place}</td>
                        </tr>
                        <tr>
                            <th scope="row">Tipo de negocio</th>
                            <td>${business_type}</td>
                        </tr>
                        <tr>
                            <th scope="row">Tipo de propiedad</th>
                            <td>${property_type}</td>
                        </tr>
                        <tr>
                            <th scope="row">Ubicación desde</th>
                            <td>${location_from}</td>
                        </tr>
                        <tr>
                            <th scope="row">Ubicación hasta</th>
                            <td>${location_until}</td>
                        </tr>
                        <tr>
                            <th scope="row">Calle desde</th>
                            <td>${street_from}</td>
                        </tr>
                        <tr>
                            <th scope="row">Calle hasta</th>
                            <td>${street_until}</td>
                        </tr>
                        <tr>
                            <th scope="row">Ubicación</th>
                            <td>${location}</td>
                        </tr>
                        <tr>
                            <th scope="row">Calle</th>
                            <td>${street}</td>
                        </tr>
                        <tr>
                            <th scope="row">Año desde</th>
                            <td>${year_old_from}</td>
                        </tr>
                        <tr>
                            <th scope="row">Año hasta</th>
                            <td>${year_old_until}</td>
                        </tr>
                        <tr>
                            <th scope="row">Precio máximo desde</th>
                            <td>${max_price_from}</td>
                        </tr>
                        <tr>
                            <th scope="row">Precio máximo hasta</th>
                            <td>${max_price_until}</td>
                        </tr>
                        <tr>
                            <th scope="row">Area desde</th>
                            <td>${area_from}</td>
                        </tr>
                        <tr>
                            <th scope="row">Area hasta</th>
                            <td>${area_until}</td>
                        </tr>
                        <tr>
                            <th scope="row">habitaciones</th>
                            <td>${rooms}</td>
                        </tr>
                        <tr>
                            <th scope="row">Baño</th>
                            <td>${bathroom}</td>
                        </tr>
                        <tr>
                            <th scope="row">estacionamiento</th>
                            <td>${parking_lot}</td>
                        </tr>
                        <tr>
                            <th scope="row">Balcón</th>
                            <td>${balcony}</td>
                        </tr>
                        <tr>
                            <th scope="row">Terraza</th>
                            <td>${terrace}</td>
                        </tr>
                        <tr>
                            <th scope="row">depositar</th>
                            <td>${deposit}</td>
                        </tr>
                        <tr>
                            <th scope="row">vista</th>
                            <td>${view}</td>
                        </tr>
                        <tr>
                            <th scope="row">código</th>
                            <td>${code}</td>
                        </tr>
                        <tr>
                            <th scope="row">Descripción</th>
                            <td>${description}</td>
                        </tr>
                        <tr>
                            <th scope="row">Tipo de propiedad mas antigua</th>
                            <td>${property_type_oldest}</td>
                        </tr>
                        <tr>
                            <th scope="row">Tiempo para comprar</th>
                            <td>${time_to_buy}</td>
                        </tr>
                        <tr>
                            <th scope="row">Como pagar</th>
                            <td>${how_to_pay}</td>
                        </tr>
                        <tr>
                            <th scope="row">Necesita vender</th>
                            <td>${need_sell}</td>
                        </tr>
                        <tr>
                            <th scope="row">Estrato</th>
                            <td>${estrato}</td>
                        </tr>
                        <tr>
                            <th scope="row">Permuta</th>
                            <td>${permuta}</td>
                        </tr>
                    </tbody>
                </table>
            </body>
            </html>
        `;
        try {
        return this.sendGrid.send({
            to: ['pleksus.app@gmail.com', 'requerimientos@pleksuscol.com'],
            from: 'pleksus.app@gmail.com',
            subject: 'Nuevo Anuncio',
            html,
        });
        } catch (e) {
        return e;
        }
    }

}
