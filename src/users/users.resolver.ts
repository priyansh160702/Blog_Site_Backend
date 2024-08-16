import { Args, Int, Query, Resolver } from '@nestjs/graphql';
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
  getUserById(@Args('id', { type: () => Int }) id: number) {
    //type:Int for Graphql and id:number for TypeScript.
    return this.usersService.getUserById(id);
  }
}
