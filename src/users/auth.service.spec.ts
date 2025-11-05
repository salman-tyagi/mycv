import { Test } from '@nestjs/testing';
import { ObjectId } from 'mongodb';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcryptjs';

import { AuthService } from './auth.service';
import { UsersService } from './users.service';

import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    let users: User[] = [];

    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = { _id: new ObjectId(), email, password } as User;
        users.push(user);

        return Promise.resolve(user);
      },
    };

    const fakeJwtService: Partial<JwtService> = {
      signAsync: () => Promise.resolve(''),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: JwtService,
          useValue: fakeJwtService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('should create instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('should create a user with hashed password', async () => {
    const user = await service.signup('test@test.com', 'test');

    expect(user.password).not.toEqual('test');
    const { password } = user;

    expect(password).toBeDefined();
  });

  it('should throw error if user signs up with email that is in use', async () => {
    await service.signup('1@email.com', 'no-matter');
    await expect(service.signup('1@email.com', 'password')).rejects.toThrow(BadRequestException);
  });

  it('should throw error if user logs in with unused/invalid email', async () => {
    await service.signup('test@test.com', 'password');
    await expect(service.login('hello@mail.com', 'hulu')).rejects.toThrow(UnauthorizedException);
  });

  it('should throw error if incorrect password is used', async () => {
    await service.signup('1@email.com', 'password');
    await expect(service.login('1@email.com', 'test')).rejects.toThrow(UnauthorizedException);
  });

  it('should return user if correct email and password provided', async () => {
    await service.signup('test@test.com', 'password');
    const user = await service.login('test@test.com', 'password');

    expect(user).toBeDefined();
  });
});
