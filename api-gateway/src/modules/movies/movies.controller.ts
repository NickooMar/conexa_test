import { Response } from 'express';
import { MoviesService } from './movies.service';
import { UserRole } from '../auth/schemas/user.schema';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import {
  Get,
  Controller,
  Res,
  HttpStatus,
  UseGuards,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateMovieRequestDto } from './dto/create-movie.dto';
import { UpdateMovieRequestDto } from './dto/update-movie.dto';

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

  @Get(':id')
  @Roles([UserRole.REGULAR, UserRole.ADMIN])
  async findOne(@Res() response: Response, @Param('id') id: string) {
    try {
      const result = await this.moviesService.findOne(id);
      return response.status(HttpStatus.OK).json(result);
    } catch (error) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Post()
  @Roles([UserRole.ADMIN])
  async create(@Res() response: Response, @Body() body: CreateMovieRequestDto) {
    try {
      const result = await this.moviesService.create(body);
      return response.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Patch(':id')
  @Roles([UserRole.ADMIN])
  async update(
    @Param('id') id: string,
    @Res() response: Response,
    @Body() body: UpdateMovieRequestDto,
  ) {
    try {
      const result = await this.moviesService.update(id, body);
      return response.status(HttpStatus.OK).json(result);
    } catch (error) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Delete(':id')
  @Roles([UserRole.ADMIN])
  async delete(@Param('id') id: string, @Res() response: Response) {
    try {
      const result = await this.moviesService.delete(id);
      return response.status(HttpStatus.OK).json(result);
    } catch (error) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
