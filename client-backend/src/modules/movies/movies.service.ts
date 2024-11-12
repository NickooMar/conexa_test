import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './schemas/movie.schema';
import { config } from 'src/config';
import { Model } from 'mongoose';

const { mongooseConfig } = config;

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name, mongooseConfig.database)
    private movieModel: Model<Movie>,
  ) {}

  async getMovies() {
    return await this.movieModel.find().exec();
  }
}
