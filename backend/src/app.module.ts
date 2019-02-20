import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TestModule } from './modules/test/test.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), TestModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
