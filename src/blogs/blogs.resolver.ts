import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Blog } from '../graphql/models/Blog.model';
import { BlogsService } from './blogs.service';
import { BlogDataDto } from 'src/dto/blogs/create-blog.dto';
import { EditBlogDataDto } from 'src/dto/blogs/edit-blog.dto';
import { DeleteBlogResponse } from 'src/graphql/models/DeleteBlogResponse.model';

@Resolver()
export class BlogsResolver {
  constructor(private blogsService: BlogsService) {}

  // Create Blog
  @UseGuards(AuthGuard('jwt')) //Route protection Guard
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

  // Delete Blog
  @Mutation(() => DeleteBlogResponse)
  deleteBlog(@Args('blogId', { type: () => Int }) blogId: number) {
    return this.blogsService.deleteBlog(blogId);
  }

  // Get blog by id
  @Query(() => Blog)
  getBlogById(@Args('blogId', { type: () => Int }) blogId: number) {
    return this.blogsService.getBlogById(blogId);
  }

  // Get Blogs by UserId
  @Query(() => [Blog])
  getBlogsByUserId(@Args('userId', { type: () => Int }) userId: number) {
    return this.blogsService.getBlogsByUserId(userId);
  }
}
