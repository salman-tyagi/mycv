import { Test } from '@nestjs/testing';
import { ObjectId } from 'mongodb';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UsersService } from './users.service';

import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
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

    service = module.get(AuthService);
  });

  it('should create instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('should create a user with hashed password', async () => {
    const user = await service.signup('test@test@email.com', 'test');

    expect(user.password).not.toEqual('test');
    const { password } = user;

    expect(password).toBeDefined();
  });
});
