import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Microservices } from 'src/types/microservices.types';

export class AuthService {
  constructor(
    @Inject(Microservices.AUTH_SERVICE)
    private readonly authServiceClient: ClientProxy,
  ) {}

  async login(loginDto: { username: string; password: string }) {
    try {
      const pattern = { cmd: 'login' };
      const response$ = this.authServiceClient.send(pattern, loginDto);
      const result = await lastValueFrom(response$);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
