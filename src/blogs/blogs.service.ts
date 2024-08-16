import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogDataDto } from 'src/dto/blogs/blog-data.dto';
import { Blog } from 'src/graphql/models/Blog.model';
import { User } from 'src/graphql/models/User.model';
import { Repository } from 'typeorm';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private blogsRepository: Repository<Blog>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

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
}
