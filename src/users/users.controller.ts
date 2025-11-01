import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { UsersService } from './users.service';
import { AuthService } from './auth.service';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { SignedUserDto } from './dtos/signed-user.dto';

import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from './decorators/current-user.decorator';

import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  createUser(@Body() { email, password }: CreateUserDto) {
    return this.authService.signup(email, password);
  }

  @Serialize(SignedUserDto)
  @Post('login')
  signin(@Body() { email, password }: CreateUserDto) {
    return this.authService.login(email, password);
  }

  @Get('current-user')
  getCurrentUser(@CurrentUser() user: User) {
    return user;
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.findOne(ObjectId.createFromHexString(id));
  }

  @Get()
  getAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(ObjectId.createFromHexString(id));
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(ObjectId.createFromHexString(id), body);
  }
}
