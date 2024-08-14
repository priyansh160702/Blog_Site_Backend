import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/graphql/models/User.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  // Returns all Users
  @Query((returns) => [User])
  getUsers() {
    return this.usersService.getUsers();
  }

  @Mutation((returns) => User)
  //   Creates a user in DB.
  createUser(@Args('userData') userData: CreateUserDto) {
    return this.usersService.createUser(userData);
  }
}
