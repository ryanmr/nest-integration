import { Controller, Get } from '@nestjs/common';
import { AppService, ColophonDto } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<ColophonDto> {
    return this.appService.getColophon();
  }
}
