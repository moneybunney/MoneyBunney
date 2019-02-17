import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { TestController } from './controllers/test.controller';

@Module({
  imports: [],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
