import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SigninRequestDto } from './dto/signin.dto';
import { SignupRequestDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Res() response: Response, @Body() body: SigninRequestDto) {
    try {
      const result = await this.authService.signin(body);
      return response.status(HttpStatus.OK).json({ data: result });
    } catch (error) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Post('signup')
  async signup(@Res() response: Response, @Body() body: SignupRequestDto) {
    try {
      const result = await this.authService.signup(body);
      return response.status(HttpStatus.OK).json({ data: result });
    } catch (error) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
