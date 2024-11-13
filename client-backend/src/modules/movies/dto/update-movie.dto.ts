import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieRequestDto } from './create-movie.dto';

export class UpdateMovieRequestDto extends PartialType(CreateMovieRequestDto) {}
