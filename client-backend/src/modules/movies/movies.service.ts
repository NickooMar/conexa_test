import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './schemas/movie.schema';
import { config } from '../../config';
import { Model } from 'mongoose';
import { CreateMovieRequestDto } from './dto/create-movie.dto';
import { UpdateMovieRequestDto } from './dto/update-movie.dto';

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

  async getMovie(id: string) {
    // Find the movie by the episode_id or the mongoose id?
    const movie = await this.movieModel.findOne({ episode_id: id }).exec();

    if (!movie) throw new Error('movie_not_found');

    return movie;
  }

  async createMovie(movie: CreateMovieRequestDto) {
    const foundMovie = await this.movieModel
      .findOne({
        $or: [{ episode_id: movie.episode_id }, { title: movie.title }],
      })
      .exec();

    if (foundMovie) throw new Error('movie_already_exists');

    return await this.movieModel.create(movie);
  }

  async updateMovie(payload: UpdateMovieRequestDto & { id: string }) {
    const { id } = payload;

    const movie = await this.movieModel.findOne({ episode_id: id }).exec();

    if (!movie) throw new Error('movie_not_found');

    return await this.movieModel.findOneAndUpdate(
      {
        episode_id: id,
      },
      payload,
      { new: true },
    );
  }

  async deleteMovie(payload: { id: string }) {
    const { id } = payload;

    const movie = await this.movieModel.findOne({ episode_id: id }).exec();

    if (!movie) throw new Error('movie_not_found');

    return await this.movieModel.findOneAndDelete({
      episode_id: id,
    });
  }
}
