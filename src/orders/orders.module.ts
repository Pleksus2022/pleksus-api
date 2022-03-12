import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ORDER, USER } from 'src/common/models/models';
import { MailModule } from 'src/mail/mail.module';
import { UserSchema } from 'src/users/schema/user.schema';
import { UsersModule } from 'src/users/users.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderSchema } from './schemas/orders.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: ORDER.name, useFactory: () => OrderSchema },
    ]),
    UsersModule,
    MailModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
