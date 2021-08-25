import { Body, Controller, Get, Post } from '@nestjs/common';
import { NewWidgetDto } from './new-widget.dto';
import { Widget } from './widget.entity';
import { WidgetsService } from './widgets.service';

@Controller('widgets')
export class WidgetsController {
  constructor(private readonly widgetsService: WidgetsService) {}

  @Get()
  getWidgets() {
    return this.widgetsService.getWidgets();
  }

  @Post()
  createWidget(@Body() newWidget: NewWidgetDto): Promise<Widget> {
    // various validation schemes here

    return this.widgetsService.createWidget(newWidget);
  }
}
