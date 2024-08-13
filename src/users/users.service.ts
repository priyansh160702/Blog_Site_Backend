import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/graphql/models';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  // @InjectRepository(User): Injects the TypeORM repository for the User entity, enabling you to interact with the database.

  constructor(
    // usersRepository: A private property that holds the injected repository, which is used to perform database operations related to the User entity.

    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
}
