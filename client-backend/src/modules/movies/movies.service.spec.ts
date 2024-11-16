import { Model } from 'mongoose';
import { config } from '../../config';
import { Movie } from './schemas/movie.schema';
import { getModelToken } from '@nestjs/mongoose';
import { MoviesService } from './movies.service';
import { Test, TestingModule } from '@nestjs/testing';

const { mongooseConfig } = config;

const mockMovie = {
  title: 'A New Hope',
  episode_id: 4,
  director: 'George Lucas',
  producer: 'Gary Kurtz, Rick McCallum',
  release_date: '1977-05-25',
  opening_crawl: 'It is a period of civil war.',
};

describe('MoviesService', () => {
  let service: MoviesService;
  const movieDoc = getModelToken(Movie.name, mongooseConfig.database);

  let movieModel: Model<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: movieDoc,
          useValue: {
            find: jest.fn().mockReturnValue({
              lean: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue([]),
              }),
            }),
            findOne: jest.fn().mockReturnValue({
              lean: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue({}),
              }),
            }),
            create: jest.fn().mockResolvedValue({ _id: '1', ...mockMovie }),
            findOneAndUpdate: jest
              .fn()
              .mockResolvedValue({ _id: '4', ...mockMovie }),
            findOneAndDelete: jest.fn().mockResolvedValue({ deletedCount: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    movieModel = module.get<Model<Movie>>(movieDoc);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of movies', async () => {
    const movies = await service.getMovies();
    expect(movies).toBeInstanceOf(Array);
  });

  it('should return a movie', async () => {
    const movie = await service.getMovie('1');
    expect(movie).toBeDefined();
  });

  it('should create a movie', async () => {
    (movieModel.findOne as jest.Mock).mockReturnValue({
      lean: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    });

    const createdMovie = await service.createMovie(mockMovie);

    expect(createdMovie).toBeDefined();
    expect(createdMovie).toHaveProperty('title', mockMovie.title);
    expect(createdMovie).toHaveProperty('episode_id', mockMovie.episode_id);
  });

  it('should update a movie', async () => {
    const mockMovie = {
      title: 'A New Hope',
      episode_id: 4,
      director: 'George Lucas',
      producer: 'Gary Kurtz, Rick McCallum',
      release_date: '1977-05-25',
      opening_crawl: 'It is a period of civil war.',
    };

    (movieModel.findOne as jest.Mock).mockReturnValue({
      lean: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockMovie),
      }),
    });

    const updatedMovie = await service.updateMovie({
      id: '4',
      ...mockMovie,
    });

    expect(updatedMovie).toBeDefined();
  });

  it('should delete a movie', async () => {
    const movieId = '4';

    (movieModel.findOne as jest.Mock).mockReturnValue({
      lean: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ id: movieId }),
      }),
    });

    // Mock findOneAndDelete to simulate the deletion
    (movieModel.findOneAndDelete as jest.Mock).mockResolvedValue({
      id: movieId,
      episode_id: movieId,
    });

    const deletedMovie = await service.deleteMovie({ id: movieId });

    expect(deletedMovie).toBeDefined();
  });
});
