import { Test } from '@nestjs/testing';
import { ObjectId } from 'mongodb';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UsersService } from './users.service';

import { User } from './user.entity';

it('should create instance of auth service', async () => {
  const FakeUsersService: Partial<UsersService> = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ _id: ObjectId, email, password } as unknown as User),
  };

  const FakeJwtService: Partial<JwtService> = {
    signAsync: () => Promise.resolve(''),
  };

  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      JwtService,
      {
        provide: UsersService,
        useValue: FakeUsersService,
      },
      {
        provide: JwtService,
        useValue: FakeJwtService,
      },
    ],
  }).compile();

  const service = module.get(AuthService);

  expect(service).toBeDefined();
});
