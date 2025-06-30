import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app/app.module';

describe('Auth - Sign up (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should sign up successfully', async () => {
    const res = await request(app.getHttpServer()).post('/auth/signup').send({
      email: 'test@example.com',
      username: 'test',
      password: 'test1234',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe('test@example.com');
  });
});
