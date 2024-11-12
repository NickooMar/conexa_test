// src/sync/sync.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Movie } from 'src/modules/movies/schemas/movie.schema';
import { config } from 'src/config';
import { SWAPIMoviesResponse } from 'src/modules/movies/types/movies.types';

const { mongooseConfig } = config;

@Injectable()
export class MoviesTask {
  private readonly logger = new Logger(MoviesTask.name);

  constructor(
    @InjectModel(Movie.name, mongooseConfig.database)
    private movieModel: Model<Movie>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async syncMovies() {
    this.logger.log('[MOVIES TASK] - Synchronizing movies');

    try {
      // Fetch movie data from the Star Wars API
      const response = await axios.get<SWAPIMoviesResponse>(
        'https://swapi.dev/api/films',
      );
      const movies = response.data.results;

      const bulkOps = movies.map((movie) => ({
        updateOne: {
          filter: { episode_id: movie.episode_id },
          update: {
            $set: {
              title: movie.title,
              episode_id: movie.episode_id,
              opening_crawl: movie.opening_crawl,
              director: movie.director,
              producer: movie.producer,
              release_date: movie.release_date,
              characters: movie.characters,
              planets: movie.planets,
              starships: movie.starships,
              vehicles: movie.vehicles,
              species: movie.species,
              created: new Date(movie.created),
              edited: new Date(movie.edited),
              url: movie.url,
            },
          },
          upsert: true,
        },
      }));

      // Execute bulk operation for better performance
      const result = await this.movieModel.bulkWrite(bulkOps, {
        ordered: false,
      });

      const { upsertedCount, modifiedCount } = result;

      this.logger.log(`Inserted ${upsertedCount} new movies.`);
      this.logger.log(`Modified ${modifiedCount} existing movies.`);

      this.logger.log(`Movies syncronized successfully`);
    } catch (error) {
      this.logger.error('Failed to synchronize movies', error);
    }
  }
}
