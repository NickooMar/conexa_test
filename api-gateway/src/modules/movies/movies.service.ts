import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Microservices } from 'src/types/microservices.types';

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
}
