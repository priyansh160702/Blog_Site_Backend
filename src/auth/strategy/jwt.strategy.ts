// This file (also know as startegy) is used to decode and verify the token.
// This class is also a provider, therefore it can use dependency injection.

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  //jwt is the key for identifying this startegy by the guard function.
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extracts the token from the Authorization Header. The Header data should be in the form - Bearer token.

      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  validate(payload: any) {
    //This function name is NOT custom.

    //The token is transformed to the payload that we provided.
    //We can transform or use the payload as we like, for example to extract the user id.

    const userId = payload.sub;

    return userId; // Whatever we return here, it is attatched to the Request object of Express.js as the "user" key.  (req.user).

    /*Since we are using GraphQl, the request object will be:-
        @Context() context:any

        context.req
    */
  }
}
