import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PollService } from './poll.service';
import { Poll } from '@database';
import { CreatePollDto } from './dto/create-poll.dto';
import { PollOptionService } from '../poll-option/poll.option.service';

@Controller('polls')
export class PollController {
  constructor(
    private readonly pollService: PollService,
    private readonly pollOptionService: PollOptionService,
  ) {}

  @Post()
  async create(@Body() createPollDto: CreatePollDto): Promise<Poll> {
    return this.pollService.create(createPollDto);
  }

  @Get()
  async findAll(): Promise<Poll[]> {
    return this.pollService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Poll> {
    const poll = await this.pollService.findOne(id);
    if (!poll) throw new Error('Poll not found');
    return poll;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Poll>,
  ): Promise<Poll> {
    return this.pollService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.pollService.remove(id);
  }

  @Post('vote/:optionId')
  vote(@Param('optionId', ParseIntPipe) optionId: number) {
    return this.pollOptionService.vote(optionId);
  }
}
