import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  email!: string;

  @Property<User>()
  username!: string;

  @Property<User>()
  password!: string;

  @Property<User>()
  createdAt = new Date();

  @Property<User>({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
