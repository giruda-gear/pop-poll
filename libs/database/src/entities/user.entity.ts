import {
  BeforeCreate,
  BeforeUpdate,
  Entity,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';

@Entity({ tableName: 'users' })
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  email!: string;

  @Property({ unique: true })
  username!: string;

  @Property({ hidden: true })
  password!: string;

  @Property({ onCreate: () => new Date() })
  createdAt?: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt?: Date;

  constructor(email: string, username: string, password: string) {
    this.email = email;
    this.username = username;
    this.password = password;
  }

  static async create(
    email: string,
    username: string,
    rawPassword: string,
  ): Promise<User> {
    const hashed = await bcrypt.hash(rawPassword, 10);
    return new User(email, username, hashed);
  }

  async validatePassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password);
  }
}
