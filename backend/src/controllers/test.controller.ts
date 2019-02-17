import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller('test')
export class TestController {
  @Get()
  getTest(): string {
    // tslint:disable-next-line:no-console
    console.log('Getting test controller');
    return 'This is a test controller';
  }
}
