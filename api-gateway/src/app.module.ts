import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: ['.env.development', '.env'],
});

@Module({
  imports: [configModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
