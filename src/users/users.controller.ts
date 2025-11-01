import { Controller, Post, Get, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { UsersService } from './users.service';
import { AuthService } from './auth.service';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { SignedUserDto } from './dtos/signed-user.dto';

import { Serialize } from './interceptors/serialize.interceptor';

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

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @Serialize(UserDto)
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.findOne(new ObjectId(id));
  }

  @Serialize(UserDto)
  @Get()
  getAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Serialize(UserDto)
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(new ObjectId(id));
  }

  @Serialize(UserDto)
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(new ObjectId(id), body);
  }
}
