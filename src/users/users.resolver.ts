import { Context, Query, Resolver } from '@nestjs/graphql';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

import { User } from 'src/graphql/models/User.model';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  // Returns all Users
  @Query((returns) => [User])
  getUsers() {
    return this.usersService.getUsers();
  }

  //Find User by id
  @UseGuards(JwtGuard)
  @Query(() => User)
  getUser(@Context() context: any) {
    const userId = context.req.user;
    return this.usersService.getUserById(userId);
  }
}
