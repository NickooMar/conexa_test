import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Microservices } from '../../types/microservices.types';
import { SigninRequestDto } from './dto/signin.dto';
import { SignupRequestDto } from './dto/signup.dto';

export class AuthService {
  constructor(
    @Inject(Microservices.AUTH_SERVICE)
    private readonly authServiceClient: ClientProxy,
  ) {}

  async signin(body: SigninRequestDto) {
    const pattern = { cmd: 'signin' };
    const response$ = this.authServiceClient.send(pattern, body);
    const result = await lastValueFrom(response$);
    return result;
  }

  async signup(body: SignupRequestDto) {
    try {
      const pattern = { cmd: 'signup' };
      const response$ = this.authServiceClient.send(pattern, body);
      const result = await lastValueFrom(response$);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
