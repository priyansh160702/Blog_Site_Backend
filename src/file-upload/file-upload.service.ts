import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { join } from 'path';

import { User } from 'src/graphql/models/User.model';
import { Blog } from 'src/graphql/models/Blog.model';
import { deleteFile } from './util';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Blog) private blogsRepository: Repository<Blog>,
  ) {}

  // User
  async userProfilePhotoUpload(userId, filePath: string) {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`User with id:${userId} not found!`);
    }

    // Delete Photo from File system if photo uploaded again.
    const previousPhotoPath = user.profilePhoto;

    if (previousPhotoPath) {
      deleteFile(previousPhotoPath);
    }

    const profilePhotoPath = filePath
      .split('public')[1]
      .replace(/^\\/, '')
      .replace(/\\/g, '/');

    // Add/Update Photo path to user
    user.profilePhoto = profilePhotoPath;

    this.usersRepository.save(user);
  }

  async blogImageUpload(blogId: number, filePath: string) {
    const blog = await this.blogsRepository.findOneBy({ id: blogId });

    if (!blog) {
      throw new NotFoundException(`Blog with id:${blogId} not found!`);
    }

    // Delete old image
    const previousPhotoPath = blog.image;

    if (previousPhotoPath) {
      deleteFile(previousPhotoPath);
    }

    const blogImagePath = filePath
      .split('public')[1]
      .replace(/^\\/, '')
      .replace(/\\/g, '/');

    blog.image = blogImagePath;

    this.blogsRepository.save(blog);
  }
}
