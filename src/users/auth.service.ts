import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './users.service';

import { MongoError } from '../constants/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string) {
    try {
      const users = await this.usersService.find(email);

      if (users.length) {
        throw new BadRequestException('email already exists');
      }

      const encryptedPass = await bcrypt.hash(password, 12);

      const user = await this.usersService.create(email, encryptedPass);

      return user;
    } catch (err) {
      if (err.code === MongoError.Code) {
        throw new BadRequestException('email in use');
      }

      throw err;
    }
  }

  async login(email: string, password: string) {
    try {
      const [user] = await this.usersService.find(email);

      if (!user) {
        throw new UnauthorizedException('incorrect email or password');
      }

      const validPass = await bcrypt.compare(password, user.password);

      if (!validPass) {
        throw new UnauthorizedException('incorrect email or password');
      }

      // Create token with user id only
      // const accessToken = await this.jwtService.signAsync({ _id: user._id });
      const accessToken = await this.jwtService.signAsync({ id: user.id });

      // TODO Set cookie
      // FIXME Send res with cookie
      // Use interceptor to create and attach cookie to the response

      return { ...user, accessToken };
    } catch (err) {
      throw err;
    }
  }
}
