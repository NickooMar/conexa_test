import { Response } from 'express';
import { MoviesService } from './movies.service';
import { UserRole } from '../auth/schemas/user.schema';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Get, Controller, Res, HttpStatus, UseGuards } from '@nestjs/common';

@Controller('movies')
@UseGuards(AuthGuard, RolesGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @Roles([UserRole.REGULAR, UserRole.ADMIN])
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
