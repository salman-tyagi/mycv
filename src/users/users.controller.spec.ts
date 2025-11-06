import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { ObjectId } from 'mongodb';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';

import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeAuthService = {
      // signup: () => {},
      login: (email: string, password: string) => {
        const accessToken = 'fake-access-token';
        const user = { _id: new ObjectId(), email, password, accessToken };

        return Promise.resolve(user);
      },
    };

    fakeUsersService = {
      findOne: (id: ObjectId) => {
        return Promise.resolve({
          _id: new ObjectId(id),
          email: 'fhsj@dhj.com',
          password: 'asdf',
        } as unknown as User);
      },

      find: (email: string) => {
        return Promise.resolve([{ _id: ObjectId, email, password: '123fdj' } as unknown as User]);
      },

      // update: () => {},
      // remove: () => {},
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
        JwtService,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users with a given email', async () => {
    const users = await controller.getAllUsers('asdf@asdf.com');
    expect(users.length).toBeGreaterThanOrEqual(1);
  });

  it('should return a user for given id', async () => {
    const user = await controller.getUser(new ObjectId().toString());
    expect(user).toBeDefined();
  });

  it('should throw error if user not found with a given id', async () => {
    fakeUsersService.findOne = () => null;

    const user = await controller.getUser(new ObjectId().toString());
    expect(user).toBe(null);
  });

  it('should return a user with token on sign in', async () => {
    const user = await controller.signin({ email: 'test@test.com', password: 'password' });

    expect(user.accessToken).toEqual('fake-access-token');
  });
});
