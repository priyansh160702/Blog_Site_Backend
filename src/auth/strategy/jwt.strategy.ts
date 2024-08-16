// This file (also know as startegy) is used to decode and verify the token.
// This class is also a provider, therefore it can use dependency injection.

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extracts the token from the Authorization Header. The Header data should be in the form - Bearer token.

      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
}
