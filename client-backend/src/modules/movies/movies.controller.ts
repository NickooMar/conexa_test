import { Controller, Inject, UseFilters } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { ExceptionFilter } from '../../exceptions/rpc-exception.filter';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { GetMoviesRequestDto } from './dto/get-movies.dto';
import { GetMovieRequestDto } from './dto/get-movie.dto';
import { CreateMovieRequestDto } from './dto/create-movie.dto';
import { UpdateMovieRequestDto } from './dto/update-movie.dto';

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

    try {
      // Revalidate checks if the cache should be re fetched
      if (!revalidate) {
        const cachedResult = await this.cacheManager.get(cacheKey);
        if (cachedResult) return cachedResult;
      }

      const movies = await this.moviesService.getMovies();

      await this.cacheManager.set(cacheKey, movies, 60000); // 1 minute

      return movies;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'getMovie' })
  @UseFilters(new ExceptionFilter())
  async getMovie(@Payload() payload: GetMovieRequestDto) {
    const { id, revalidate } = payload;

    const cacheKey = `movies_getMovie_${id}`;

    try {
      // Revalidate checks if the cache should be re fetched
      if (!revalidate) {
        const cachedResult = await this.cacheManager.get(cacheKey);
        if (cachedResult) return cachedResult;
      }

      const movies = await this.moviesService.getMovie(id);

      await this.cacheManager.set(cacheKey, movies, 60000); // 1 minute

      return movies;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'createMovie' })
  @UseFilters(new ExceptionFilter())
  async createMovie(@Payload() payload: CreateMovieRequestDto) {
    try {
      return await this.moviesService.createMovie(payload);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'updateMovie' })
  @UseFilters(new ExceptionFilter())
  async updateMovie(
    @Payload() payload: UpdateMovieRequestDto & { id: string },
  ) {
    try {
      return await this.moviesService.updateMovie(payload);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'deleteMovie' })
  @UseFilters(new ExceptionFilter())
  async deleteMovie(@Payload() payload: { id: string }) {
    try {
      return await this.moviesService.deleteMovie(payload);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
