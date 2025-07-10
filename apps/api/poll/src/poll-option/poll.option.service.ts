// src/poll-option/poll-option.service.ts

import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import Redis from 'ioredis';
import { EntityManager } from '@mikro-orm/core';
import { Poll, PollOption } from '@database';

@Injectable()
export class PollOptionService {
  constructor(
    private readonly em: EntityManager,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) {}

  private getVoteKey(optionId: number): string {
    return `poll:option:${optionId}`;
  }

  async vote(optionId: number): Promise<void> {
    const option = await this.em.findOne(PollOption, optionId);
    if (!option) throw new NotFoundException('Option not found');
    const key = this.getVoteKey(optionId);
    await this.redis.hincrby(key, 'voteCount', 1);
  }

  async getVoteCount(optionId: number): Promise<number> {
    const key = this.getVoteKey(optionId);
    const count = await this.redis.hget(key, 'voteCount');
    return count ? parseInt(count, 10) : 0;
  }

  async syncVotesToDB(pollId: number): Promise<void> {
    const options = await this.em.find(PollOption, { poll: pollId });
    for (const option of options) {
      const key = this.getVoteKey(option.id);
      const cachedCount = await this.redis.hget(key, 'voteCount');
      if (cachedCount !== null) {
        const voteCount = parseInt(cachedCount);
        await this.em.nativeUpdate(
          PollOption,
          { id: option.id },
          { voteCount },
        );

        await this.redis.del(key);
      }
    }
  }
}
