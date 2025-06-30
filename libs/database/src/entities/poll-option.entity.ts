import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Poll } from "./poll.entity";

@Entity()
export class PollOption {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Poll)
  poll!: Poll;

  @Property()
  optionText!: string;

  @Property({ default: 0 })
  voteCount = 0;
}