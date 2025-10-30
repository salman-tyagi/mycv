import { Injectable, BadRequestException } from '@nestjs/common';

import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(email: string, password: string) {
    // check if email is registered, if yes throw error
    const users = await this.userService.find(email);

    if (users.length) {
      throw new BadRequestException('email in use');
    }

    // hash the user's password

    // save the user in DB

    // return user
  }

  signIn() {}
}
