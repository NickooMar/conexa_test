import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('CLIENT_BACKEND_PORT', 3002);
  const host = configService.get<string>('CLIENT_BACKEND_HOST', 'localhost');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: host,
      port: port,
    },
  });

  await app
    .startAllMicroservices()
    .then(() =>
      Logger.log(
        `[BACKEND SERVICE] - Microservice is listening on port ${port}`,
        'Bootstrap',
      ),
    )
    .catch((error) => Logger.error(error, 'Bootstrap'));
}

bootstrap();
