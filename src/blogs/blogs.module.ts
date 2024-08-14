import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlogsService } from './blogs.service';
import { BlogsResolver } from './blogs.resolver';
import { Blog } from 'src/graphql/models/Blog.model';

@Module({
  imports: [TypeOrmModule.forFeature([Blog])],
  providers: [BlogsService, BlogsResolver],
})
export class BlogsModule {}
