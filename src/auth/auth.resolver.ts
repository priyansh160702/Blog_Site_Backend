import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { LoginResponse } from 'src/graphql/models/LoginResponse.model';
import { LoginDataDto } from 'src/dto/login-data.dto';
import { SignupDataDto } from 'src/dto/signup-data.dto';
import { User } from 'src/graphql/models/User.model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  //   Creates a user in DB.
  @Mutation((returns) => User)
  signup(@Args('signupData') signupData: SignupDataDto) {
    return this.authService.signup(signupData);
  }

  // Login
  @Mutation(() => LoginResponse)
  login(@Args('loginData') loginData: LoginDataDto) {
    return this.authService.login(loginData);
  }
}
