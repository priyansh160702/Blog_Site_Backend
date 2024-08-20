import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class ResetPasswordStrategy extends PassportStrategy(
  Strategy,
  'reset-password',
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_RESET_PASSWORD_TOKEN'),
    });
  }

  validate(payload: any) {
    const userId = payload.sub;

    return userId;
  }
}
