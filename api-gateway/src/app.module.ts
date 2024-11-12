import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from './config';

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
    configModule,
    AuthModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
