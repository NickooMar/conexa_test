import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Res,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SigninRequestDto } from './dto/signin.dto';
import { SignupRequestDto } from './dto/signup.dto';
import { Public } from '../../common/decorators/auth.decorator';
import { ExtendedRequest } from 'src/common/guards/types/request.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @Public()
  async signin(@Res() response: Response, @Body() body: SigninRequestDto) {
    try {
      const result = await this.authService.signin(body);
      return response.status(HttpStatus.OK).json(result);
    } catch (error) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Post('signup')
  @Public()
  async signup(@Res() response: Response, @Body() body: SignupRequestDto) {
    try {
      const result = await this.authService.signup(body);
      return response.status(HttpStatus.OK).json(result);
    } catch (error) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Get('refresh')
  async refreshToken(
    @Res() response: Response,
    @Req() request: ExtendedRequest,
  ) {
    const { sub: userId } = request.user;

    try {
      const result = await this.authService.refreshToken(userId);
      return response.status(HttpStatus.OK).json(result);
    } catch (error) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
