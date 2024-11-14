// import { ClientProxy } from '@nestjs/microservices';
import { Model } from 'mongoose';
import { Response } from 'express';
import { config } from '../../config';
import { AuthService } from './auth.service';
import { User } from './schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { SigninRequestDto } from './dto/signin.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { Microservices } from '../../types/microservices.types';
import { HttpStatus } from '@nestjs/common';
import { SignupRequestDto } from './dto/signup.dto';

const { mongooseConfig } = config;

describe('AuthController', () => {
  // let authServiceClient: ClientProxy;
  let authController: AuthController;
  let authService: AuthService;
  const userDoc = getModelToken(User.name, mongooseConfig.database);
  let response: Response;

  let userModel = Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signin: jest.fn(),
            signup: jest.fn(),
          },
        },
        {
          provide: Microservices.AUTH_SERVICE,
          useValue: {
            send: jest.fn(),
          },
        },
        {
          provide: userDoc,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    // authServiceClient = module.get<ClientProxy>(Microservices.AUTH_SERVICE);
    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
    userModel = module.get<Model<User>>(userDoc);

    response = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    } as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
    expect(userModel).toBeDefined();
  });

  describe('Sign in', () => {
    it('should sign in an user and return the access token', async () => {
      const body: SigninRequestDto = {
        email: 'test@example.com',
        password: '12345678',
      };
      const result = { accessToken: 'token' };

      jest.spyOn(authService, 'signin').mockResolvedValue(result);

      await authController.signin(response, body);

      expect(authService.signin).toHaveBeenCalledWith(body);
      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(response.json).toHaveBeenCalledWith(result);
    });

    it('should fail when the user doesnt provides an email', async () => {
      const body: SigninRequestDto = {
        email: null,
        password: '12345678',
      };
      const result = {
        message: ['email should not be empty'],
        error: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
      };

      jest.spyOn(authService, 'signin').mockResolvedValue(result);

      await authController.signin(response, body);

      expect(authService.signin).toHaveBeenCalledWith(body);
      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(response.json).toHaveBeenCalledWith(result);
    });

    it('should fail when the user doesnt provides a password', async () => {
      const body: SigninRequestDto = {
        email: 'test@test.com',
        password: null,
      };
      const result = {
        message: ['email should not be empty'],
        error: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
      };

      jest.spyOn(authService, 'signin').mockResolvedValue(result);

      await authController.signin(response, body);

      expect(authService.signin).toHaveBeenCalledWith(body);
      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(response.json).toHaveBeenCalledWith(result);
    });
  });

  describe('Sign up', () => {
    it('should sign up an user and return the access token', async () => {
      const body: SignupRequestDto = {
        email: 'create_user@test.com',
        username: 'create_user',
        password: '12345678',
        confirmPassword: '12345678',
      };

      const result = {
        role: 'regular',
        userId: '67352a8a7...',
        username: 'create_user',
        userEmail: 'create_user@test.com',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      };

      jest.spyOn(authService, 'signup').mockResolvedValue(result);
      await authController.signup(response, body);

      expect(authService.signup).toHaveBeenCalledWith(body);
      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(response.json).toHaveBeenCalledWith(result);
    });
  });
});
