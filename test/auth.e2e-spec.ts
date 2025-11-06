import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

import { setupApp } from '../src/setup.app';

describe('Authentication System', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupApp(app);

    await app.init();
  });

  it('should handle a signup request', async () => {
    const testEmail = 'okay@data.com';

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
