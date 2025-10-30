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
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';

import { SerializeInterceptor } from './interceptors/serialize.interceptor';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.create(body.email, body.password);
  }

  @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.findOne(new ObjectId(id));
  }

  @Get()
  getAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(new ObjectId(id));
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(new ObjectId(id), body);
  }
}
