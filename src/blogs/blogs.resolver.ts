import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';
import { Blog } from '../graphql/models/Blog.model';
import { BlogsService } from './blogs.service';
import { BlogDataDto } from 'src/dto/blogs/create-blog.dto';
import { EditBlogDataDto } from 'src/dto/blogs/edit-blog.dto';
import { DeleteBlogResponse } from 'src/graphql/models/DeleteBlogResponse.model';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Resolver()
export class BlogsResolver {
  constructor(private blogsService: BlogsService) {}

  // Create Blog
  @UseGuards(JwtGuard) //Route protection Guard
  @Mutation(() => Blog)
  createBlog(@Args('blogData') blogData: BlogDataDto) {
    return this.blogsService.createBlog(blogData);
  }

  // Edit Blog
  @UseGuards(JwtGuard) //Route protection Guard
  @Mutation(() => Blog)
  editBlog(
    @Args('blogId', { type: () => Int }) blogId: number,
    @Args('editBlogData') editBlogData: EditBlogDataDto,
  ) {
    return this.blogsService.editBlog(blogId, editBlogData);
  }

  // Delete Blog
  @UseGuards(JwtGuard) //Route protection Guard
  @Mutation(() => DeleteBlogResponse)
  deleteBlog(@Args('blogId', { type: () => Int }) blogId: number) {
    return this.blogsService.deleteBlog(blogId);
  }

  // Get blog by id
  @UseGuards(JwtGuard) //Route protection Guard
  @Query(() => Blog)
  getBlogById(@Args('blogId', { type: () => Int }) blogId: number) {
    return this.blogsService.getBlogById(blogId);
  }

  // Get Blogs by UserId
  @UseGuards(JwtGuard) //Route protection Guard
  @Query(() => [Blog])
  getBlogsByUserId(@Context() context: any) {
    const userId = context.req.user;

    return this.blogsService.getBlogsByUserId(userId);
  }
}
