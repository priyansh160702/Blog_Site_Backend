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

  //Find User by id
  @Query(() => User)
  getUserById(@Args('id', { type: () => Int }) id: number) {
    //type:Int for Graphql and id:number for TypeScript.
    return this.usersService.getUserById(id);
  }
}
