import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { TypeFile, renameImages } from 'src/common/helpers/filter-file';
import { UserUpdateDTO } from './dto/userUpdate.dto';
import { UsersService } from './users.service';
import { Response } from 'express';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ENcontrar un usuario por id
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  //Obtener todos los usuarios
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  //Borrar un usuario
  @Delete(':id')
  delete(@Param('id') id: string){
    return this.usersService.delete(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() user: UserUpdateDTO) {
    if(user.admin){
      this.usersService.sendEmailAdmin(id)
    }
    return this.usersService.update(id, user);
  }

  //Actualizacion de contraseña
  @Patch('update-password/:id')
  updatePassword(@Param('id') id: string, @Body() user: UserUpdateDTO) {
    console.log(user)
    return this.usersService.updatePassword(id, user);
  }

  //Verificacion de codigo
  @Get('send-verification-code/:username')
  sendVerificationCode(@Param('username') username: string) {
    return this.usersService.sendVerificationCode(username);
  }

  @Get('send-verification-code/:username/:code')
  verificationCode(
    @Param('username') username: string,
    @Param('code') code: string,
  ) {
    return this.usersService.verificationCode(username, code);
  }

  //Actualizacion de imagen de perfil
  @UseGuards(JwtAuthGuard)
  @Patch('update-photo-profile/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
        destination:'./files',
        filename: renameImages
    }),
    fileFilter: TypeFile
  }))
  updatePhotoProfile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // console.log(file)
    return this.usersService.updatePhotoProfile(id, file);
  }
}
