import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogDataDto } from 'src/dto/blogs/create-blog.dto';
import { EditBlogDataDto } from 'src/dto/blogs/edit-blog.dto';
import { Blog } from 'src/graphql/models/Blog.model';
import { User } from 'src/graphql/models/User.model';
import { Repository } from 'typeorm';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private blogsRepository: Repository<Blog>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  // Create Blog
  async createBlog(blogData: BlogDataDto) {
    const { userId, ...blogDataWithoutUserId } = blogData;

    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const newBlog = this.blogsRepository.create({
      ...blogDataWithoutUserId,
      user,
    });

    return this.blogsRepository.save(newBlog);
  }

  //Edit Blog
  async editBlog(blogId: number, editBlogData: EditBlogDataDto) {
    const blog = await this.blogsRepository.findOneBy({ id: blogId });

    if (!blog) {
      throw new NotFoundException('Blog not found!');
    }

    await this.blogsRepository.update(blogId, editBlogData);

    return this.blogsRepository.findOneBy({ id: blogId });
  }

  // Delete Blog
  async deleteBlog(blogId: number) {
    const blog = await this.blogsRepository.findOneBy({ id: blogId });

    if (!blog) {
      throw new NotFoundException('Blog not found!');
    }

    await this.blogsRepository.remove(blog);

    return { message: 'Blog deleted successfully!' };
  }

  // Get Blog by Id
  async getBlogById(blogId: number) {
    const blog = await this.blogsRepository.findOneBy({ id: blogId });

    if (!blog) {
      throw new NotFoundException('Blog not found!');
    }

    return blog;
  }
}
