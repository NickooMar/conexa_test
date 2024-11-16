import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { config } from '../../config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { User } from './schemas/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { SigninRequestDto } from './dto/signin.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { SignupRequestDto } from './dto/signup.dto';

const { mongooseConfig } = config;

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  const userDoc = getModelToken(User.name, mongooseConfig.database);

  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('test_token'),
          },
        },
        {
          provide: userDoc,
          useValue: {
            exec: jest.fn().mockResolvedValue(null),
            lean: jest.fn(),
            save: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userModel = module.get<Model<User>>(userDoc);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(userModel).toBeDefined();
  });

  describe('Signin', () => {
    it('should authorize user and return an access token', async () => {
      const body: SigninRequestDto = {
        email: 'test@test.com',
        password: '12345678',
      };

      // Mock user data
      const mockUser = {
        _id: 'userId123',
        email: 'test@test.com',
        password: await bcrypt.hash('12345678', 10),
        role: 'regular',
        username: 'test',
      };

      // Mock findOne to return the mock user
      (userModel.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockUser),
        }),
      });

      const response = await authService.singin(body);

      expect(response).toHaveProperty('accessToken', 'test_token');
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: mockUser._id,
        role: mockUser.role,
        email: mockUser.email,
        username: mockUser.username,
      });
    });
  });

  describe('Signup', () => {
    it('should create a user and return an access token with user data', async () => {
      const body: SignupRequestDto = {
        email: 'test_create@test.com',
        username: 'test_create',
        password: '12345678',
        confirmPassword: '12345678',
      };

      // Mock findOne to return null (indicating user does not already exist)
      (userModel.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(null),
        }),
      });

      // Mock save method to simulate saving the new user
      const mockUser = {
        _id: 'userId123',
        email: body.email.toLowerCase(),
        username: body.username.toLowerCase(),
        password: await bcrypt.hash(body.password, 10),
        role: 'regular',
        save: jest.fn().mockResolvedValue(this),
      };
      (userModel.create as jest.Mock).mockResolvedValue(mockUser);

      const response = await authService.signup(body);

      expect(response).toHaveProperty('accessToken', 'test_token');
      expect(response).toHaveProperty('userId', mockUser._id);
      expect(response).toHaveProperty('userEmail', mockUser.email);
      expect(response).toHaveProperty('username', mockUser.username);
      expect(response).toHaveProperty('role', mockUser.role);

      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: mockUser._id,
        role: mockUser.role,
        email: mockUser.email,
        username: mockUser.username,
      });
    });
  });
});
