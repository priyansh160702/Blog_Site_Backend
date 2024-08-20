import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { LoginResponse } from 'src/graphql/models/LoginResponse.model';
import { LoginDataDto } from 'src/dto/auth/login-data.dto';
import { SignupDataDto } from 'src/dto/auth/signup-data.dto';
import { User } from 'src/graphql/models/User.model';
import { ObjectTypeResponse } from 'src/graphql/models/ObjectTypeResponse.model';

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

  /* Reset Password Functionality */
  // Forgot Password
  /*
    User will click the "Forgot Password" button and will be required to enter his/her registered email.
  */

  @Mutation(() => ObjectTypeResponse)
  async forgotPassword(@Args('userMail') userMail: string) {
    try {
      return await this.authService.forgotPassword(userMail);
    } catch (err) {
      return { message: err };
    }
  }
}
