import { Injectable, BadRequestException } from '@nestjs/common';
import bcrypt from 'bcryptjs';

import { UsersService } from './users.service';

import { ENCRYPT_SALT } from '../constants/config';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(email: string, password: string) {
    try {
      // check if email is registered, if yes throw error
      const users = await this.userService.find(email);

      if (users.length) {
        throw new BadRequestException('email in use');
      }

      // hash the user's password
      const encryptedPass = await bcrypt.hash(password, ENCRYPT_SALT);

      // save the user in DB
      const user = await this.userService.create(email, encryptedPass);

      // return user
      return user;
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException('email in use');
      }

      throw new BadRequestException(err.message);
    }
  }

  signIn() {}
}
