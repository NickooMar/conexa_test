import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../../src/common/guards/auth.guard';
import { RolesGuard } from '../../src/common/guards/roles.guard';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { MoviesModule } from '../../src/modules/movies/movies.module';

// Mock jwt.verify to hardcode the JWT payload for testing
// jest.mock('jsonwebtoken', () => ({
//   verify: jest.fn((token, secretOrKey, options, callback) => {
//     callback(null, {
//       payload: {
//         sub: '67352a8a71c0ba72e1648f4c',
//         role: 'regular',
//         email: 'test@test.com',
//         username: 'test',
//         iat: 1731547314,
//         exp: 5031633714,
//       },
//       header: 'header',
//       signature: 'signature',
//     });
//   }),
// }));

describe('Movies (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MoviesModule],
      providers: [],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should return movies', async () => {
    const URL = '/api/movies';
    const expectedMovies = [
      {
        title: 'A New Hope',
        director: 'George Lucas',
      },
      {
        title: 'The Empire Strikes Back',
        director: 'Irvin Kershner',
      },
    ];

    return request(app.getHttpServer())
      .get(URL)
      .expect(HttpStatus.OK)
      .expect((response) => {
        const mappedMovies = response.body.map((movie) => ({
          title: movie.title,
          director: movie.director,
        }));
        expect(mappedMovies).toEqual(expect.arrayContaining(expectedMovies));
      });
  });

  it('should return a single movie', async () => {
    const URL = '/api/movies/1';
    return request(app.getHttpServer())
      .get(URL)
      .expect(HttpStatus.OK)
      .expect((response) => {
        expect(response.body).toHaveProperty('title');
      });
  });

  /* IT REFLECTS ON DATABASE */
  //   it('should create a movie', async () => {
  //     const URL = '/api/movies/1';
  //     return request(app.getHttpServer())
  //       .get(URL)
  //       .expect(HttpStatus.OK)
  //       .expect((response) => {
  //         expect(response.body).toHaveProperty('title');
  //       });
  //   });
  //   it('should update a movie', async () => {
  //     const URL = '/api/movies/1';
  //     return request(app.getHttpServer())
  //       .get(URL)
  //       .expect(HttpStatus.OK)
  //       .expect((response) => {
  //         expect(response.body).toHaveProperty('title');
  //       });
  //   });
  //   it('should delete a movie', async () => {
  //     const URL = '/api/movies/1';
  //     return request(app.getHttpServer())
  //       .get(URL)
  //       .expect(HttpStatus.OK)
  //       .expect((response) => {
  //         expect(response.body).toHaveProperty('title');
  //       });
  //   });
});
