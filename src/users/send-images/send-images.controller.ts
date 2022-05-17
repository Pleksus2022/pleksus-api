import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
const fs   = require('fs');
const path = require('path');

@Controller('api/send-images')
export class SendImagesController {
    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res:Response) {
        // return res.sendFile(image, { root: './files' });
        const pathImagen = path.join( __dirname, '../../../files', image );
        if ( fs.existsSync( pathImagen ) ) {
            return res.sendFile( pathImagen )
        } 
    }
}
