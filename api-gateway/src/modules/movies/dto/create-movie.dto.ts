import { Type } from 'class-transformer';
import {
  IsUrl,
  IsDate,
  IsArray,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateMovieRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @Type(() => Number)
  episode_id: number;

  @IsString()
  @IsNotEmpty()
  opening_crawl: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsString()
  @IsNotEmpty()
  producer: string;

  @IsString()
  @IsNotEmpty()
  release_date: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  characters?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  planets?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  starships?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  vehicles?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  species?: string[];

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  created?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  edited?: Date;

  @IsUrl()
  @IsOptional()
  url?: string;
}
