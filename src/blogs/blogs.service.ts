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

  // Get all blogs
  getBlogs() {
    return this.blogsRepository.find({ relations: ['user'] }); //For populating Users.
  }

  // Create Blog
  async createBlog(userId, blogData: BlogDataDto) {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const newBlog = this.blogsRepository.create({
      ...blogData,
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
    const blog = await this.blogsRepository.findOne({
      where: { id: blogId },
      relations: ['user'],
    });

    if (!blog) {
      throw new NotFoundException('Blog not found!');
    }

    return blog;
  }
}
