import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Poll, PollStatus, PollOption, User } from '@database';
import { CreatePollDto } from './dto/create-poll.dto';

@Injectable()
export class PollService {
  constructor(private readonly em: EntityManager) {}

  async create(data: CreatePollDto): Promise<Poll> {
    const creator = this.em.getReference(User, data.creator);
  
    const poll = this.em.create(Poll, {
      title: data.title,
      description: data.description,
      creator,
      startAt: new Date(data.startAt),
      endAt: new Date(data.endAt),      
      status: data.status ?? PollStatus.SCHEDULED,
      options: [],
    });
  
    for (const optionDto of data.options) {
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
    return this.em.find(Poll, {});
  }

  async findOne(id: number): Promise<Poll | null> {
    return this.em.findOne(Poll, { id });
  }

  async update(id: number, data: Partial<Poll>): Promise<Poll> {
    const poll = await this.findOneOrFail(id);
    this.em.assign(poll, data);
    await this.em.flush();
    return poll;
  }

  async remove(id: number): Promise<void> {
    const poll = await this.findOneOrFail(id);
    await this.em.removeAndFlush(poll);
  }

  private async findOneOrFail(id: number): Promise<Poll> {
    const poll = await this.findOne(id);
    if (!poll) throw new NotFoundException(`Poll ${id} not found`);
    return poll;
  }
}