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
  const port = configService.get<number>('AUTH_SERVICE_PORT', 3001);
  const host = configService.get<string>('AUTH_SERVICE_HOST', 'localhost');

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
        `[AUTH SERVICE] - Microservice is listening on port ${port}`,
        'Bootstrap',
      ),
    )
    .catch((error) => Logger.error(error, 'Bootstrap'));
}

bootstrap();
