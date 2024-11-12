import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('CLIENT_BACKEND_PORT', 3002);
  const httpPort = configService.get<number>('CLIENT_BACKEND_HTTP_PORT', 3003);
  const host = configService.get<string>('CLIENT_BACKEND_HOST', 'localhost');

  app.useGlobalPipes(new ValidationPipe());

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

  // Must initialize the HTTP server because Cron jobs are tied to the HTTP server
  app
    .listen(httpPort, () => {
      Logger.log(
        `[BACKEND SERVICE] - Backend service is listening on port ${httpPort}`,
        'Bootstrap',
      );
    })
    .catch((error) => Logger.error(error, 'Bootstrap'));
}

bootstrap();
