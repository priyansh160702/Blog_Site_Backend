import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { User } from 'src/graphql/models/User.model';
import { Blog } from 'src/graphql/models/Blog.model';

@Module({
  imports: [TypeOrmModule.forFeature([User, Blog])],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
