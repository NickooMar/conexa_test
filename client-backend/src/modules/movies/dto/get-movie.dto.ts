import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetMovieRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsBoolean()
  revalidate?: boolean;
}
