import { AsyncApiSub } from 'nestjs-asyncapi';
import { AuthService } from './auth.service';
import { SigninRequestDto } from './dto/signin.dto';
import { SignupRequestDto } from './dto/signup.dto';
import { Controller, UseFilters } from '@nestjs/common';
import { ExceptionFilter } from '../../exceptions/rpc-exception.filter';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'signin' })
  @UseFilters(new ExceptionFilter())
  @AsyncApiSub({
    channel: 'auth/signin',
    summary: 'Signin',
    description: 'Signin a user',
    message: {
      payload: SigninRequestDto,
    },
  })
  async handleSignin(@Payload() data: SigninRequestDto) {
    try {
      return await this.authService.singin(data);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'signup' })
  @UseFilters(new ExceptionFilter())
  @AsyncApiSub({
    channel: 'auth/signup',
    summary: 'Signup',
    description: 'Signup a user',
    message: {
      payload: SignupRequestDto,
    },
  })
  async handleSignup(@Payload() data: SignupRequestDto) {
    try {
      return await this.authService.signup(data);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'refreshToken' })
  @UseFilters(new ExceptionFilter())
  async refreshToken(@Payload() userId: string) {
    try {
      const newToken = await this.authService.refreshToken(userId);
      return newToken;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
