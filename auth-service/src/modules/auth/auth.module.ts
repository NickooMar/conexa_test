import { config } from '../../config';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../modules/auth/schemas/user.schema';

const { mongooseConfig } = config;

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      mongooseConfig.database,
    ),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
