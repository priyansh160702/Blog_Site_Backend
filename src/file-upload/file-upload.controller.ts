import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';

import { FileUploadService } from './file-upload.service';
import { fileInceptor } from './util';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @UseGuards(JwtGuard)
  @Post('user')
  @UseInterceptors(fileInceptor('users'))
  userProfilePhotoUpload(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const userId = req.user;

    this.fileUploadService.userProfilePhotoUpload(userId, file.path);

    return { success: true };
  }
}
