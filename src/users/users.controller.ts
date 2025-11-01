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

import { ProtectInterceptor } from './interceptors/protect.interceptor';

@Controller('auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Serialize(UserDto)
  @Post('signup')
  createUser(@Body() { email, password }: CreateUserDto) {
    return this.authService.signup(email, password);
  }

  @Serialize(SignedUserDto)
  @Post('login')
  signin(@Body() { email, password }: CreateUserDto) {
    return this.authService.login(email, password);
  }

  @Serialize(UserDto)
  @UseInterceptors(ProtectInterceptor)
  @Get('protect')
  getCurrentUser(@CurrentUser() user: string) {
    return user;
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @Serialize(UserDto)
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.findOne(ObjectId.createFromHexString(id));
  }

  @UseInterceptors(ProtectInterceptor)
  @Serialize(UserDto)
  @Get()
  getAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Serialize(UserDto)
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(ObjectId.createFromHexString(id));
  }

  @Serialize(UserDto)
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(ObjectId.createFromHexString(id), body);
  }
}
