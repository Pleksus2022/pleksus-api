import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { UserSchema } from './schema/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SendImagesController } from './send-images/send-images.controller';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: USER.name, useFactory: () => UserSchema },
    ])
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController, SendImagesController],
})
export class UsersModule {}
