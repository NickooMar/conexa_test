// import { ClientProxy } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Microservices } from '../../types/microservices.types';
import { SigninRequestDto } from './dto/signin.dto';
import { Response } from 'express';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  // let authServiceClient: ClientProxy;
  let response: Response;

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
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
    // authServiceClient = module.get<ClientProxy>(Microservices.AUTH_SERVICE);
    response = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    } as any;
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
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
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith(result);
    });

    it('should fail when the user doesnt provides an email', async () => {
      const body: SigninRequestDto = {
        email: null,
        password: '12345678',
      };
      const result = { accessToken: 'token' };

      jest.spyOn(authService, 'signin').mockResolvedValue(result);

      await authController.signin(response, body);

      console.log({ response: response.json });

      expect(authService.signin).toHaveBeenCalledWith(body);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith(result);
    });
  });
});
