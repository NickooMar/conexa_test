import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import MongooseMainConfig from './database/mongoose/main.config';
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
      signOptions: { expiresIn: jsonWebTokenConfig.expiresIn },
    }),
    configModule,
    MongooseMainConfig,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
