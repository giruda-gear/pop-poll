// src/poll-option/poll-option.service.ts

import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import Redis from 'ioredis';
import { EntityManager } from '@mikro-orm/core';
import { PollOption } from '@database';

@Injectable()
export class PollOptionService {
  constructor(
    private readonly em: EntityManager,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) {}

  private getRedisKey(optionId: number): string {
    return `poll:option:${optionId}:voteCount`;
  }

  async vote(optionId: number): Promise<void> {
    const key = this.getRedisKey(optionId);
    await this.redis.incr(key);
  }

  async getVoteCount(optionId: number): Promise<number> {
    const key = this.getRedisKey(optionId);
    const count = await this.redis.get(key);
    return count ? parseInt(count, 10) : 0;
  }

  async syncVoteCountToDb(optionId: number): Promise<void> {
    const key = this.getRedisKey(optionId);
    const count = await this.redis.get(key);
    if (!count) return;

    const option = await this.em.findOne(PollOption, optionId);
    if (!option) throw new NotFoundException('Option not found');

    option.voteCount = parseInt(count, 10);
    await this.em.persistAndFlush(option);

    await this.redis.del(key);
  }
}
