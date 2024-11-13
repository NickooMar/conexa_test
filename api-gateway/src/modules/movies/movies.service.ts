import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Microservices } from 'src/types/microservices.types';
import { CreateMovieRequestDto } from './dto/create-movie.dto';
import { UpdateMovieRequestDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @Inject(Microservices.CLIENT_BACKEND)
    private readonly clientBackendService: ClientProxy,
  ) {}

  async findAll() {
    const pattern = { cmd: 'getMovies' };
    const response$ = this.clientBackendService.send(pattern, {});
    const result = await lastValueFrom(response$);
    return result;
  }

  async findOne(id: string) {
    const pattern = { cmd: 'getMovie' };
    const response$ = this.clientBackendService.send(pattern, { id });
    const result = await lastValueFrom(response$);
    return result;
  }

  async create(body: CreateMovieRequestDto) {
    const pattern = { cmd: 'createMovie' };
    const response$ = this.clientBackendService.send(pattern, body);
    const result = await lastValueFrom(response$);
    return result;
  }

  async update(id: string, body: UpdateMovieRequestDto) {
    const pattern = { cmd: 'updateMovie' };
    const response$ = this.clientBackendService.send(pattern, { id, ...body });
    const result = await lastValueFrom(response$);
    return result;
  }

  async delete(id: string) {
    const pattern = { cmd: 'deleteMovie' };
    const response$ = this.clientBackendService.send(pattern, { id });
    const result = await lastValueFrom(response$);
    return result;
  }
}
