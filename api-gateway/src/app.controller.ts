import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { Public } from './common/decorators/auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @Public()
  healthCheck(@Res() response: Response): Response<string> {
    const res = this.appService.healthCheck();
    return response.status(HttpStatus.OK).json({ status: res });
  }
}
