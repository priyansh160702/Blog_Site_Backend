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

    const profilePhotoPath = join('public', filePath.split('public')[1]);

    // Add/Update Photo path to user
    user.profilePhoto = profilePhotoPath;

    this.usersRepository.save(user);
  }
}
