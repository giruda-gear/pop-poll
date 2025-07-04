import { EntityManager } from '@mikro-orm/core';
import { PollService } from './poll.service';
import { Test } from '@nestjs/testing';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { mikroOrmConfig, Poll, PollOption, PollStatus, User } from '@database';
import { CreatePollDto } from './dto/create-poll.dto';

describe('PollService', () => {
  let pollService: PollService;
  // let em: EntityManager;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({ ...mikroOrmConfig, allowGlobalContext: true }),
        MikroOrmModule.forFeature([User, Poll, PollOption]),
      ],
      providers: [PollService],
    }).compile();

    // em = moduleRef.get<EntityManager>(EntityManager);
    pollService = moduleRef.get<PollService>(PollService);
  });

  beforeEach(async () => {
    // await em.begin();
  });

  afterEach(async () => {
    // await em.rollback();
  });

  describe('create', () => {
    it('should create a poll successfully', async () => {
      const testUser = {
        id: 15,
      };

      const createPollDto: CreatePollDto = {
        title: 'Test Poll2',
        description: 'Test Description',
        creator: testUser.id,
        startAt: '2024-07-15T09:00:00Z',
        endAt: '2024-07-15T18:00:00Z',
        options: [{ optionText: 'Option A' }, { optionText: 'Option B' }],
      };

      // Act
      const result = await pollService.create(createPollDto);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.title).toBe('Test Poll2');
      expect(result.description).toBe('Test Description');
      expect(result.creator.id).toBe(testUser.id);
      expect(result.status).toBe(PollStatus.SCHEDULED);
      expect(result.options).toHaveLength(2);
      expect(result.options[0].optionText).toBe('Option A');
      expect(result.options[1].optionText).toBe('Option B');
    });
  });
});
