import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // tslint:disable-next-line:no-console
    console.log('Getting index controller');
    return this.appService.getHello();
  }
}
