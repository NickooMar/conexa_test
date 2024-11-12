import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Microservices } from 'src/types/microservices.types';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: Microservices.CLIENT_BACKEND,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: configService.get<number>('CLIENT_BACKEND_TCP_PORT', 3002),
            host: configService.get<string>('CLIENT_BACKEND_HOST', 'localhost'),
          },
        }),
      },
    ]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
