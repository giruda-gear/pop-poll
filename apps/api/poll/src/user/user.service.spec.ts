import { EntityManager, MikroORM } from '@mikro-orm/core';
import { UserService } from './user.service';
import { Test } from '@nestjs/testing';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { mikroOrmConfig, User } from '@database';

describe('UserService ', () => {
  let orm: MikroORM;
  let forkedEm: EntityManager;
  let userService: UserService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(mikroOrmConfig),
        MikroOrmModule.forFeature([User]),
      ],
      providers: [UserService],
    }).compile();

    orm = moduleRef.get(MikroORM);
  });

  beforeEach(async () => {
    forkedEm = orm.em.fork(); 
    await forkedEm.begin(); 
    userService = new UserService(forkedEm);
  });

  afterEach(async () => {
    await forkedEm.rollback();
  });

  afterAll(async () => {
    await orm.close();
  });

  it('should create a user', async () => {
    const user = await userService.create({
      email: 'unit@example.com',
      username: 'unit',
      password: '1234',
    });
    expect(user.email).toBe('unit@example.com');
  });
});
