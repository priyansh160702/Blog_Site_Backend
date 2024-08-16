import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlogsService } from './blogs.service';
import { BlogsResolver } from './blogs.resolver';
import { Blog } from 'src/graphql/models/Blog.model';
import { User } from 'src/graphql/models/User.model';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, User])],
  providers: [BlogsService, BlogsResolver],
})
export class BlogsModule {}
