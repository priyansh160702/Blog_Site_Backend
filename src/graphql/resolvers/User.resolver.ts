import { Query, Resolver } from '@nestjs/graphql';
import { User } from '../models/User.model';

@Resolver()
export class UserResolver {
  @Query((returns) => User)
  /*
    query{
      getUser{
        name
        blogs
       }
    }
  */
  getUser() {
    return {
      id: 1,
      name: 'FAke user 1',
      email: 'test@test.com',
    };
  }
}
