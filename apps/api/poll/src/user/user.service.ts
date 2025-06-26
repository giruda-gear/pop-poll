import { User } from '@database';
import { EntityManager } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, username, password } = createUserDto;
    const user = await User.create(email, username, password);
    await this.em.persistAndFlush(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.em.findAll(User);
  }

  async findOne(id: number): Promise<User | null> {
    return this.em.findOne(User, { id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.em.findOne(User, { email });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
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
