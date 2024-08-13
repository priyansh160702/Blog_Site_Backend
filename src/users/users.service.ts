import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/graphql/models';
import { CreateUserDto } from 'src/dto/create-user.dto';

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

  //   Create User
  createUser(userData: CreateUserDto) {
    const newUser = this.usersRepository.create(userData);

    return this.usersRepository.save(newUser);
  }
}
