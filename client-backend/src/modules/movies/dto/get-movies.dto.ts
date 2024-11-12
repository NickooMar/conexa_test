import { IsBoolean, IsOptional } from 'class-validator';

export class GetMoviesRequestDto {
  @IsOptional()
  @IsBoolean()
  revalidate?: boolean;
}
