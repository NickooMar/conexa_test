import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { SigninRequestDto } from './dto/signin.dto';
import { SignupRequestDto } from './dto/signup.dto';
import { ExceptionFilter } from 'src/exceptions/rpc-exception.filter';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'signin' })
  @UseFilters(new ExceptionFilter())
  async handleSignin(data: SigninRequestDto) {
    return await this.authService.singin(data);
  }

  @MessagePattern({ cmd: 'signup' })
  @UseFilters(new ExceptionFilter())
  async handleSignup(data: SignupRequestDto) {
    return await this.authService.signup(data);
  }
}
