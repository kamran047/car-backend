import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtToken } from './jwt.token';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "secret"
    });
  }

  async validate(payload: JwtToken) {
    const userObj = await this.authService.getUserByUserId(
      payload.userId,
    );

    if (userObj) {
      return {
        userObj,
        ...payload,
      };
    }
  }
}
