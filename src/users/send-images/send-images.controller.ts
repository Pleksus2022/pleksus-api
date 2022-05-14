import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('api/send-images')
export class SendImagesController {
    @Get(':imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res:Response) {
        return res.sendFile(image, { root: './files' });
    }
}
