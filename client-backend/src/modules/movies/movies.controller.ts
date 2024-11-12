import { Controller, Inject, UseFilters } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExceptionFilter } from 'src/exceptions/rpc-exception.filter';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { GetMoviesRequestDto } from './dto/get-movies.dto';

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @MessagePattern({ cmd: 'getMovies' })
  @UseFilters(new ExceptionFilter())
  async getMovies(@Payload() payload: GetMoviesRequestDto) {
    const { revalidate } = payload;

    const cacheKey = `movies_getMovies`;

    // Revalidate checks if the cache should be revalidated
    if (!revalidate) {
      const cachedResult = await this.cacheManager.get(cacheKey);
      if (cachedResult) return cachedResult;
    }

    const movies = await this.moviesService.getMovies();

    await this.cacheManager.set(cacheKey, movies, 60000); // 1 minute

    return movies;
  }
}
