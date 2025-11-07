import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';

import { AppModule } from '../src/app.module';
import { resetDatabase } from './setup';

describe('Authentication System', () => {
  let app: INestApplication<App>;
  const testEmail = 'test@test.com';
  const testPass = 'password';

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
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: testEmail,
        password: testPass,
      })
      .expect(201)
      .then((res) => {
        const { _id, email } = res.body;

        expect(_id).toBeDefined();
        expect(email).toEqual(testEmail);
      });
  });

  it('should log the user in if he is signed-up before also allowed to get access guarded endpoint', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: testEmail,
        password: testPass,
      })
      .expect(201)
      .then(async (res) => {
        const { _id, email, accessToken } = res.body;

        expect(_id).toBeDefined();
        expect(email).toEqual(testEmail);
        expect(accessToken).toBeDefined();

        return request(app.getHttpServer())
          .get('/auth')
          .set({
            authorization: `Bearer ${accessToken}`,
          })
          .expect(200)
          .then((res) => {
            expect(res.body).toStrictEqual([]);
          });
      });
  });
});
