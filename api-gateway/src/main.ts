import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({ origin: true, credentials: true });

  await app
    .listen(3000)
    .then(() =>
      Logger.log(`[API GATEWAY] - Listening on port ${port}`, 'Bootstrap'),
    )
    .catch((error) => Logger.error(error, 'Bootstrap'));
}
bootstrap();
