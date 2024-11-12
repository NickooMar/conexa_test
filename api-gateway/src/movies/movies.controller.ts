import { Get, Controller, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Response } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('movies')
@UseGuards(AuthGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const result = await this.moviesService.findAll();
      return response.status(HttpStatus.OK).json(result);
    } catch (error) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
