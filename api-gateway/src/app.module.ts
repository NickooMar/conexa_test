import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { MoviesModule } from './modules/movies/movies.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from './config';
import MongooseMainConfig from './database/mongoose/main.config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { AuthGuard } from './common/guards/auth.guard';

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
      signOptions: {
        expiresIn: jsonWebTokenConfig.expiresIn,
      },
    }),
    AuthModule,
    configModule,
    MoviesModule,
    MongooseMainConfig,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
