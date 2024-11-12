// src/sync/sync.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Movie } from 'src/modules/movies/schemas/movie.schema';
import { config } from 'src/config';

const { mongooseConfig } = config;

@Injectable()
export class MoviesTask {
  private readonly logger = new Logger(MoviesTask.name);

  constructor(
    @InjectModel(Movie.name, mongooseConfig.database)
    private movieModel: Model<Movie>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleCron() {
    console.log('CRON');

    this.logger.log('[MOVIES TASK] - Synchronizing movies');

    // try {
    //   // Fetch movie data from the Star Wars API
    //   const response = await axios.get('https://swapi.dev/api/films');
    //   const movies = response.data.results;

    //   console.log({ movies });

    //   //   for (const movie of movies) {
    //   //     // Upsert each movie based on title (to avoid duplicates)
    //   //     await this.movieModel.updateOne(
    //   //       { title: movie.title },
    //   //       {
    //   //         title: movie.title,
    //   //         director: movie.director,
    //   //         producer: movie.producer,
    //   //         release_date: movie.release_date,
    //   //         characters: movie.characters,
    //   //       },
    //   //       { upsert: true },
    //   //     );
    //   //   }

    //   this.logger.log(`Synchronized ${movies.length} movies successfully.`);
    // } catch (error) {
    //   this.logger.error('Failed to synchronize movies', error);
    // }
  }
}
