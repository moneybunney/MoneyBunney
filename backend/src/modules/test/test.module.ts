import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { TestSchema } from './schemas/test.schema';

// test module for playing around and testing db configuration
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Test', schema: TestSchema }])],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
