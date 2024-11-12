import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { MoviesModule } from './modules/movies/movies.module';
import mongooseMainConfig from './database/mongoose/main.config';
import { CacheModule } from '@nestjs/cache-manager';

const { jsonWebTokenConfig } = config;

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: ['.env.development', '.env'],
});

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jsonWebTokenConfig.secret,
      signOptions: { expiresIn: jsonWebTokenConfig.expiresIn },
    }),
    CacheModule.register({
      ttl: 10000, // Cache expiration time in milliseconds
      max: 20, // Maximum number of items in cache
      isGlobal: true,
    }),
    CacheModule.register(),
    ScheduleModule.forRoot(),
    mongooseMainConfig,
    configModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
