import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import mongooseMainConfig from './database/mongoose/main.config';

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: ['.env.development', '.env'],
});

@Module({
  imports: [configModule, mongooseMainConfig, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
