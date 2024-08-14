import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon from 'argon2';

import { User } from 'src/graphql/models/User.model';
import { LoginDataDto } from 'src/dto/login-data.dto';
import { SignupDataDto } from 'src/dto/signup-data.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  //   Create User
  async signup(signupData: SignupDataDto) {
    const { name, email, password, profilePhoto } = signupData;

    const hashedPassword = await argon.hash(password);

    const newUser = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      profilePhoto,
    });

    return this.usersRepository.save(newUser);
  }

  async login(loginData: LoginDataDto) {
    const { email, password } = loginData;

    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new ForbiddenException('Credentials Incorrect!');
    }

    console.log(user.password);

    const pwIsEqual = await argon.verify(user.password, password);

    if (!pwIsEqual) {
      throw new ForbiddenException('Credentials Incorrect!');
    }

    return {
      message: 'Logged in successfully!',
      token: 'Token',
    };
  }
}
