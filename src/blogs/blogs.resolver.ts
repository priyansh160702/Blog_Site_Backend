import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Blog } from '../graphql/models/Blog.model';
import { BlogsService } from './blogs.service';

@Resolver()
export class BlogsResolver {
  constructor(private blogsService: BlogsService) {}
}
