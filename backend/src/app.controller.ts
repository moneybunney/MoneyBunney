import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getApp(): string {
    // tslint:disable-next-line:no-console
    return 'Index of MonneyBunney';
  }
}
