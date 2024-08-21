import {
  Body,
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

  // User
  @UseGuards(JwtGuard)
  @Post('user')
  @UseInterceptors(fileInceptor('users'))
  async userProfilePhotoUpload(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const userId = req.user;

    await this.fileUploadService.userProfilePhotoUpload(userId, file.path);

    return { message: 'File saved successfully!' };
  }

  // Blog
  @UseGuards(JwtGuard)
  @Post('blog')
  @UseInterceptors(fileInceptor('blogs'))
  async blogImageUpload(
    @UploadedFile() file: Express.Multer.File,
    @Body() reqBody,
  ) {
    await this.fileUploadService.blogImageUpload(reqBody.blogId, file.path);

    return { message: 'File saved successfully!' };
  }
}
