import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { Microservices } from 'src/types/microservices.types';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: Microservices.AUTH_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: configService.get<number>('AUTH_SERVICE_PORT', 3001),
            host: configService.get<string>('AUTH_SERVICE_HOST', 'localhost'),
          },
        }),
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
