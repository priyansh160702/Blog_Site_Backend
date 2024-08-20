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
import { ResetPasswordDto } from 'src/dto/auth/reset-password-data.dto';

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
    const url = 'https://www.google.com';

    const subject = 'Reset Password';

    const html = `        
            <h1>Reset Password</h1>
            <p>Click on the <a href=${url}/${token}>${token}</a> to reset your password.</p>
    `;

    await this.mailerService.sendEmail(userMail, subject, html);

    return { message: 'Email sent successfully!' };
  }

  // Reset Password
  async resetPassword(id: number, resetPasswordData: ResetPasswordDto) {
    const { newPassword } = resetPasswordData;

    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const hashedPassword = await argon.hash(newPassword);

    user.password = hashedPassword;

    await this.usersRepository.save(user);

    // Sending confirmation mail

    const subject = 'Password reset successfull';

    const html = `
      <h1>Your password has been reset successfully!</h1>
      <a>Login</a> to your account.
    `;

    await this.mailerService.sendEmail(user.email, subject, html);

    return { message: 'Password reset successfull' };
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
