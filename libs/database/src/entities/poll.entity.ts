import {
  Cascade,
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from './user.entity';
import { PollOption } from './poll-option.entity';

export enum PollStatus {
  ACTIVE = 'active',
  ENDED = 'ended',
  SCHEDULED = 'scheduled',
}

@Entity()
export class Poll {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  description?: string;

  @ManyToOne(() => User)
  creator!: User;

  @Property()
  startAt!: Date;

  @Property()
  endAt!: Date;

  @Enum(() => PollStatus)
  status: PollStatus = PollStatus.SCHEDULED;

  @OneToMany(() => PollOption, (option) => option.poll, {
    cascade: [Cascade.PERSIST, Cascade.REMOVE],
  })
  options = new Collection<PollOption>(this);

  @Property({ onCreate: () => new Date() })
  createdAt?: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt?: Date;
}
