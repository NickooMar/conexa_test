import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { Test, TestingModule } from '@nestjs/testing';
import { SigninRequestDto } from 'src/modules/auth/dto/signin.dto';
import { SignupRequestDto } from 'src/modules/auth/dto/signup.dto';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({}));
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('Signin', () => {
    const URL = '/api/auth';

    it('should sign in if the user exists', () => {
      return request(app.getHttpServer())
        .post(`${URL}/signin`)
        .send({
          email: 'test@test.com',
          password: '12345678',
        } as SigninRequestDto)
        .expect(HttpStatus.OK)
        .expect((response) => {
          expect(response.body.accessToken).toBeDefined();
          expect(typeof response.body.accessToken).toBe('string');
        });
    });

    it('should return error if the user doesnt exists', () => {
      return request(app.getHttpServer())
        .post(`${URL}/signin`)
        .send({
          email: 'not_found@email.com',
          password: '12345678',
        } as SigninRequestDto)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR)
        .expect((response) => {
          expect(response.body.message).toBe('invalid_credentials');
        });
    });

    it('should return error if email isnt valid', async () => {
      return await request(app.getHttpServer())
        .post(`${URL}/signin`)
        .send({
          email: 'invalid',
          password: '12345678',
        } as SigninRequestDto)
        .expect(HttpStatus.BAD_REQUEST)
        .expect((response) => {
          expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
          expect(response.body.message).toContain('email must be an email');
          expect(response.body.error).toBe('Bad Request');
        });
    });

    it('should return error if email is null', async () => {
      return await request(app.getHttpServer())
        .post(`${URL}/signin`)
        .send({
          email: null,
          password: '12345678',
        } as SigninRequestDto)
        .expect(HttpStatus.BAD_REQUEST)
        .expect((response) => {
          expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
          expect(response.body.message).toContain('email should not be empty');
          expect(response.body.error).toBe('Bad Request');
        });
    });

    it('should return error if password is null', async () => {
      return await request(app.getHttpServer())
        .post(`${URL}/signin`)
        .send({
          email: 'test@test.com',
          password: null,
        } as SigninRequestDto)
        .expect(HttpStatus.BAD_REQUEST)
        .expect((response) => {
          expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
          expect(response.body.message).toContain(
            'password should not be empty',
          );
          expect(response.body.error).toBe('Bad Request');
        });
    });

    it('should return error if password has less than 8 characters', async () => {
      return await request(app.getHttpServer())
        .post(`${URL}/signin`)
        .send({
          email: 'test@test.com',
          password: '1234567',
        } as SigninRequestDto)
        .expect(HttpStatus.BAD_REQUEST)
        .expect((response) => {
          expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
          expect(response.body.message).toContain(
            'password must be longer than or equal to 8 characters',
          );
          expect(response.body.error).toBe('Bad Request');
        });
    });

    it('should return error if password has more than 20 characters', async () => {
      return await request(app.getHttpServer())
        .post(`${URL}/signin`)
        .send({
          email: 'test@test.com',
          password: '123456789012345678901',
        } as SigninRequestDto)
        .expect(HttpStatus.BAD_REQUEST)
        .expect((response) => {
          expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
          expect(response.body.message).toContain(
            'password must be shorter than or equal to 20 characters',
          );
          expect(response.body.error).toBe('Bad Request');
        });
    });
  });

  describe('Signup', () => {
    const URL = '/api/auth';

    /* --- OPERATION REFLECTS ON DATABASE --- */
    // it('should sign up if the user doesnt exists', () => {
    //   return request(app.getHttpServer())
    //     .post(`${URL}/signup`)
    //     .send({
    //       email: 'create_user@email.com',
    //       username: 'test_create_user',
    //       password: '12345678',
    //       confirmPassword: '12345678',
    //     } as SignupRequestDto)
    //     .expect((response) => {
    //         expect(response.body.accessToken).toBeDefined();
    //         expect(typeof response.body.accessToken).toBe('string');
    //         expect(response.body.userId).toBeDefined();
    //         expect(response.body.role).toBeDefined();
    //         expect(response.body.user.userEmail).toBeDefined();
    //         expect(response.body.user.username).toBeDefined();
    //     });
    // });

    it('should return error if the email is invalid', () => {
      return request(app.getHttpServer())
        .post(`${URL}/signup`)
        .send({
          email: 'invalid email',
          username: 'test_create_user',
          password: '12345678',
          confirmPassword: '12345678',
        } as SignupRequestDto)
        .expect(HttpStatus.BAD_REQUEST)
        .expect((response) => {
          expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
          expect(response.body.message).toContain('email must be an email');
          expect(response.body.error).toBe('Bad Request');
        });
    });

    it('should return error if the email has less than 6 characters', () => {
      return request(app.getHttpServer())
        .post(`${URL}/signup`)
        .send({
          email: 'a@b.c',
          username: 'test_create_user',
          password: '12345678',
          confirmPassword: '12345678',
        } as SignupRequestDto)
        .expect(HttpStatus.BAD_REQUEST)
        .expect((response) => {
          expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
          expect(response.body.message).toContain(
            'email must be longer than or equal to 6 characters',
          );
          expect(response.body.error).toBe('Bad Request');
        });
    });

    it('should return error if the email has more than 50 characters', () => {
      return request(app.getHttpServer())
        .post(`${URL}/signup`)
        .send({
          email: 'a'.repeat(51).concat('@test.com'),
          username: 'test_create_user',
          password: '12345678',
          confirmPassword: '12345678',
        } as SignupRequestDto)
        .expect(HttpStatus.BAD_REQUEST)
        .expect((response) => {
          expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
          expect(response.body.message).toContain(
            'email must be shorter than or equal to 50 characters',
          );
          expect(response.body.error).toBe('Bad Request');
        });
    });

    it('should return error if the username has less than 4 characters', () => {
      return request(app.getHttpServer())
        .post(`${URL}/signup`)
        .send({
          email: 'test@test.com',
          username: 'tes',
          password: '12345678',
          confirmPassword: '12345678',
        } as SignupRequestDto)
        .expect(HttpStatus.BAD_REQUEST)
        .expect((response) => {
          expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
          expect(response.body.message).toContain(
            'username must be longer than or equal to 4 characters',
          );
          expect(response.body.error).toBe('Bad Request');
        });
    });

    it('should return error if the username has more than 25 characters', () => {
      return request(app.getHttpServer())
        .post(`${URL}/signup`)
        .send({
          email: 'test@test.com',
          username: 'a'.repeat(26),
          password: '12345678',
          confirmPassword: '12345678',
        } as SignupRequestDto)
        .expect(HttpStatus.BAD_REQUEST)
        .expect((response) => {
          expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
          expect(response.body.message).toContain(
            'username must be shorter than or equal to 25 characters',
          );
          expect(response.body.error).toBe('Bad Request');
        });
    });

    it('should return error if the password is invalid', () => {
      return request(app.getHttpServer())
        .post(`${URL}/signup`)
        .send({
          email: 'test@test.com',
          username: 'test',
          password: null,
          confirmPassword: '12345678',
        } as SignupRequestDto)
        .expect(HttpStatus.BAD_REQUEST)
        .expect((response) => {
          expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
          expect(response.body.message).toContain(
            'password should not be empty',
          );
          expect(response.body.error).toBe('Bad Request');
        });
    });

    it('should return error if the password has less than 8 characters', () => {
      return request(app.getHttpServer())
        .post(`${URL}/signup`)
        .send({
          email: 'test@test.com',
          username: 'test',
          password: '1',
          confirmPassword: '1',
        } as SignupRequestDto)
        .expect(HttpStatus.BAD_REQUEST)
        .expect((response) => {
          expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
          expect(response.body.message).toContain(
            'password must be longer than or equal to 8 characters',
          );
          expect(response.body.error).toBe('Bad Request');
        });
    });

    it('should return error if the password has more than 20 characters', () => {
      return request(app.getHttpServer())
        .post(`${URL}/signup`)
        .send({
          email: 'test@test.com',
          username: 'test',
          password: '1'.repeat(21),
          confirmPassword: '1'.repeat(21),
        } as SignupRequestDto)
        .expect(HttpStatus.BAD_REQUEST)
        .expect((response) => {
          expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
          expect(response.body.message).toContain(
            'password must be shorter than or equal to 20 characters',
          );
          expect(response.body.error).toBe('Bad Request');
        });
    });

    it('should return error if the password doesnt match the confirmPassword', () => {
      return request(app.getHttpServer())
        .post(`${URL}/signup`)
        .send({
          email: 'test@test.com',
          username: 'test',
          password: '12345678',
          confirmPassword: '123456789',
        } as SignupRequestDto)
        .expect(HttpStatus.BAD_REQUEST)
        .expect((response) => {
          expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
          expect(response.body.message).toContain('Passwords do not match!');
          expect(response.body.error).toBe('Bad Request');
        });
    });
  });
});
