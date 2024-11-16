import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GetMoviesResponseDto } from './get-movies.dto';

export class GetMovieRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsBoolean()
  revalidate?: boolean;
}

export interface GetMovieResponseDto extends GetMoviesResponseDto {}
