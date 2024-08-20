import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { User } from 'src/graphql/models/User.model';
import { LoginDataDto } from 'src/dto/auth/login-data.dto';
import { SignupDataDto } from 'src/dto/auth/signup-data.dto';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwt: JwtService,
    private configService: ConfigService,
    private mailerService: MailerService,
  ) {}

  // Singup
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

  // Login
  async login(loginData: LoginDataDto) {
    const { email, password } = loginData;

    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new ForbiddenException('Credentials Incorrect!');
    }

    const pwIsEqual = await argon.verify(user.password, password);

    if (!pwIsEqual) {
      throw new ForbiddenException('Credentials Incorrect!');
    }

    const token = await this.signToken(user.id, user.email, 'JWT_LOGIN_SECRET');

    return {
      message: 'Logged in successfully!',
      token,
    };
  }

  /* Reset Password Functionality */
  // Forgot Password
  async forgotPassword(userMail: string) {
    const user = await this.usersRepository.findOneBy({ email: userMail });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    // Sign Token
    const token = await this.signToken(
      user.id,
      user.email,
      'JWT_RESET_PASSWORD_TOKEN',
    );

    // Sending mail
    await this.mailerService.sendEmail(userMail, token);

    return { message: 'Email sent successfully!' };
  }

  // Sign Token with JWT
  signToken(userId: number, email: string, jwtSecret: string) {
    const payload = {
      sub: userId, //'sub' is a naming convention.
      email,
    };

    return this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: this.configService.get(jwtSecret),
    });
  }
}
