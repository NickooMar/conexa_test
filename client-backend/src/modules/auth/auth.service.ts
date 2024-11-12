import { Model } from 'mongoose';
import { config } from 'src/config';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/modules/auth/schemas/user.schema';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { UpdateRoleRequestDto } from './dto/update-role.dto';

const { mongooseConfig } = config;

export class AuthService {
  constructor(
    @InjectModel(User.name, mongooseConfig.database)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async updateUserRole(payload: UpdateRoleRequestDto) {}
}
