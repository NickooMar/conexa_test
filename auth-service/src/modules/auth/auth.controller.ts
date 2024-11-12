import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { SigninRequestDto } from './dto/signin.dto';
import { SignupRequestDto } from './dto/signup.dto';
import { ExceptionFilter } from 'src/exceptions/rpc-exception.filter';
import { AsyncApiSub } from 'nestjs-asyncapi';

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
    return await this.authService.singin(data);
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
    return await this.authService.signup(data);
  }
}
