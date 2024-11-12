import { config } from 'src/config';
import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesTask } from 'src/tasks/movies.task';
import { MoviesController } from './movies.controller';
import { Movie, MovieSchema } from './schemas/movie.schema';

const { mongooseConfig } = config;

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Movie.name, schema: MovieSchema }],
      mongooseConfig.database,
    ),
  ],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesTask],
})
export class MoviesModule {}
