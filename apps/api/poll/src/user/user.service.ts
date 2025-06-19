import { User } from '@database';
import { EntityManager } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.em.create(User, createUserDto);
    await this.em.persistAndFlush(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.em.findAll(User);
  }

  async findOne(id: number): Promise<User | null> {
    return this.em.findOne(User, { id });
  }

  async update(
    id: number,
    updateUserDto: Partial<CreateUserDto>
  ): Promise<User> {
    const user = await this.findUserOrFail(id);
    this.em.assign(user, updateUserDto);
    await this.em.flush();
    return user;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findUserOrFail(id);
    return this.em.removeAndFlush(user);
  }

  private async findUserOrFail(id: number): Promise<User> {
    const user = await this.em.findOne(User, { id });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }
}
