import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/database/schemas/user.schema';
import { config } from 'src/config';

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
