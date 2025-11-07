import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';

import { AppModule } from '../src/app.module';
import { resetDatabase } from './setup';

describe('Authentication System', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    await resetDatabase();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should handle a signup request', async () => {
    const testEmail = 'okay1@data.com';

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: testEmail,
        password: 'password',
      })
      .expect(201)
      .then((res) => {
        const { _id, email } = res.body;

        expect(_id).toBeDefined();
        expect(email).toEqual(testEmail);
      });
  });
});
