import {
  ExecutionContext,
  CanActivate,
  UnauthorizedException,
  Inject,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongodb';

import { UsersService } from '../users/users.service';
import { JwtError } from '../constants/config';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => JwtService))
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const req = context.switchToHttp().getRequest();

      const [type, token] = req.headers?.authorization?.split(' ') || [];

      if (type !== 'Bearer' || !token) {
        throw new UnauthorizedException('You are not logged in');
      }

      const decode = await this.jwtService.verifyAsync(token);
      // const user = await this.usersService.findOne(ObjectId.createFromHexString(decode._id));
      const user = await this.usersService.findOne(decode.id);

      if (!user) {
        throw new NotFoundException('User not found with this token');
      }

      req.user = user;
      return true;
    } catch (err) {
      if (err.name === JwtError.ExpiredJwt) {
        throw new UnauthorizedException('Token expired');
      }

      if (err.name === JwtError.InvalidJwt) {
        throw new UnauthorizedException('Invalid token');
      }

      throw err;
    }
  }
}
