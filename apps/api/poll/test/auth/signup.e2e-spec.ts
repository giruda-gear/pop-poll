import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app/app.module';
import { MikroORM } from '@mikro-orm/core';

describe('Auth - Signup (e2e)', () => {
  let app: INestApplication;
  let orm: MikroORM;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    orm = app.get(MikroORM);
  });

  beforeEach(async () => {
    // 글로벌 컨텍스트에서 트랜잭션 시작
    await orm.em.begin();
  });

  afterEach(async () => {
    // 글로벌 컨텍스트에서 롤백
    await orm.em.rollback();
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
