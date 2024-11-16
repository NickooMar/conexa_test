import { ObjectId } from 'mongodb';
import { IsBoolean, IsOptional } from 'class-validator';

export class GetMoviesRequestDto {
  @IsOptional()
  @IsBoolean()
  revalidate?: boolean;
}

export interface GetMoviesResponseDto {
  _id: ObjectId;
  episode_id: number;
  __v: number;
  characters: string[];
  created: Date;
  director: string;
  edited: Date;
  opening_crawl: string;
  planets: string[];
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  title: string;
  createdAt: Date;
  updatedAt: Date;
  url: string;
  vehicles: string[];
}
