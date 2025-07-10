import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Poll, PollStatus, PollOption, User } from '@database';
import { CreatePollDto } from './dto/create-poll.dto';
import { PollOptionService } from '../poll-option/poll.option.service';

@Injectable()
export class PollService {
  private readonly logger = new Logger(PollService.name);

  constructor(
    private readonly em: EntityManager,
    private readonly pollOptionService: PollOptionService,
  ) {}

  async create(createPollDto: CreatePollDto): Promise<Poll> {
    const creator = this.em.getReference(User, createPollDto.creator);

    const poll = this.em.create(Poll, {
      title: createPollDto.title,
      description: createPollDto.description,
      creator,
      startAt: new Date(createPollDto.startAt),
      endAt: new Date(createPollDto.endAt),
      status: createPollDto.status ?? PollStatus.SCHEDULED,
      options: [],
    });

    for (const optionDto of createPollDto.options) {
      const option = this.em.create(PollOption, {
        optionText: optionDto.optionText,
        poll: poll,
        voteCount: 0,
      });
      poll.options.add(option);
    }

    await this.em.persistAndFlush(poll);
    return poll;
  }

  async findAll(): Promise<Poll[]> {
    return this.em.find(Poll, {}, { populate: ['options'] });
  }

  async findOne(pollId: number): Promise<Poll | null> {
    return this.em.findOne(Poll, pollId);
  }

  async update(pollId: number, data: Partial<Poll>): Promise<Poll> {
    const poll = await this.findOneOrFail(pollId);
    this.em.assign(poll, data);
    await this.em.flush();
    return poll;
  }

  async endPoll(pollId: number): Promise<void> {
    const poll = await this.findOneOrFail(pollId);

    if (poll.status === PollStatus.ENDED) {
      throw new Error('Poll is already ended');
    }

    poll.status = PollStatus.ENDED;
    await this.em.flush();

    try {
      await this.pollOptionService.syncVotesToDB(pollId);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Vote sync failed for poll ${pollId}`, error.stack);
      } else {
        this.logger.error(
          `Vote sync failed for poll ${pollId}: ${JSON.stringify(error)}`,
        );
      }
    }
  }

  async remove(pollId: number): Promise<void> {
    const poll = await this.findOneOrFail(pollId);
    await this.em.removeAndFlush(poll);
  }

  private async findOneOrFail(id: number): Promise<Poll> {
    const poll = await this.findOne(id);
    if (!poll) throw new NotFoundException(`Poll ${id} not found`);
    return poll;
  }
}
