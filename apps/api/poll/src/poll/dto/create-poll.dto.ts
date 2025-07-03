import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested, ArrayMinSize, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { PollStatus } from '@database';

class CreatePollOptionDto {
  @IsString()
  @IsNotEmpty()
  optionText!: string;
}

export class CreatePollDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  creator!: number;

  @IsDateString()
  startAt!: string;

  @IsDateString()
  endAt!: string;

  @IsEnum(PollStatus)
  @IsOptional()
  status?: PollStatus;

  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => CreatePollOptionDto)
  options!: CreatePollOptionDto[];
}