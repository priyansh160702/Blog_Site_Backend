import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon from 'argon2';

import { User } from 'src/graphql/models/User.model';

@Injectable()
export class UsersService {
  // @InjectRepository(User): Injects the TypeORM repository for the User entity, enabling you to interact with the database.

  constructor(
    // usersRepository: A private property that holds the injected repository, which is used to perform database operations related to the User entity.

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  //This will return a Promise and hence will be an Asynchronous function.
  getUsers() {
    return this.usersRepository.find();
  }

  // Find User by id
  async getUserById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }
  /*
  # Alternative
  getUserById(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }
  */
}
