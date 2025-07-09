import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Poll } from '@database';
import { PollOptionModule } from '../poll-option/poll.option.module';

@Module({
  imports: [MikroOrmModule.forFeature([Poll]), PollOptionModule],
  controllers: [PollController],
  providers: [PollService],
  exports: [PollService],
})
export class PollModule {}
