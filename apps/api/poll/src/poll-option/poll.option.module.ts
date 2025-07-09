import { PollOption } from '@database';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PollOptionService } from './poll.option.service';

@Module({
  imports: [MikroOrmModule.forFeature([PollOption])],
  providers: [PollOptionService],
  exports: [PollOptionService],
})
export class PollOptionModule {}
