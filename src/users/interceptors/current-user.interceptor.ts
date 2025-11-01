import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongodb';

import { UsersService } from '../users.service';
import { JwtError } from 'src/constants/config';

// [x]
// This is not about authenticate the user interceptors are actually used to modify the coming
// request and outgoing response that's it
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const req = context.switchToHttp().getRequest();

    const [type, token] = req.headers?.authorization?.split(' ') || [];

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('You are not logged in');
    }

    try {
      const decode = await this.jwtService.verifyAsync(token);
      const user = await this.usersService.findOne(ObjectId.createFromHexString(decode._id));

      if (user) {
        req.user = user;
      }
    } catch (err) {
      if (err.name === JwtError.ExpiredJwt) {
        throw new UnauthorizedException('Token expired');
      }

      if (err.name === JwtError.InvalidJwt) {
        throw new UnauthorizedException('Invalid token');
      }

      throw err;
    }

    return handler.handle();
  }
}
// [x]
