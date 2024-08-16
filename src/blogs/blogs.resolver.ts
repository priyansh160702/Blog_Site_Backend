import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Blog } from '../graphql/models/Blog.model';
import { BlogsService } from './blogs.service';
import { BlogDataDto } from 'src/dto/blogs/create-blog.dto';

@Resolver()
export class BlogsResolver {
  constructor(private blogsService: BlogsService) {}

  // Create Blog
  @Mutation(() => Blog)
  createBlog(@Args('blogData') blogData: BlogDataDto) {
    return this.blogsService.createBlog(blogData);
  }
}
