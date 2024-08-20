import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { User } from 'src/graphql/models/User.model';
import { JwtStrategy } from './strategy/jwt.strategy';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({})],
  providers: [AuthService, AuthResolver, JwtStrategy, MailerService],
})
export class AuthModule {}
