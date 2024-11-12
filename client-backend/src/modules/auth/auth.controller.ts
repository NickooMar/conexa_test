import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { ExceptionFilter } from 'src/exceptions/rpc-exception.filter';
import { UpdateRoleRequestDto } from './dto/update-role.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'signin' })
  @UseFilters(new ExceptionFilter())
  async updateUserRole(data: UpdateRoleRequestDto) {
    return await this.authService.updateUserRole(data);
  }
}
