import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';

import { Blog } from '../graphql/models/Blog.model';
import { BlogsService } from './blogs.service';
import { BlogDataDto } from 'src/dto/blogs/create-blog.dto';
import { EditBlogDataDto } from 'src/dto/blogs/edit-blog.dto';

@Resolver()
export class BlogsResolver {
  constructor(private blogsService: BlogsService) {}

  // Create Blog
  @Mutation(() => Blog)
  createBlog(@Args('blogData') blogData: BlogDataDto) {
    return this.blogsService.createBlog(blogData);
  }

  // Edit Blog
  @Mutation(() => Blog)
  editBlog(
    @Args('blogId', { type: () => Int }) blogId: number,
    @Args('editBlogData') editBlogData: EditBlogDataDto,
  ) {
    return this.blogsService.editBlog(blogId, editBlogData);
  }
}
