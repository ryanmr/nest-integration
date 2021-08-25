import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewWidgetDto } from './new-widget.dto';
import { Widget } from './widget.entity';

@Injectable()
export class WidgetsService {
  constructor(
    @InjectRepository(Widget)
    private readonly widgetRepository: Repository<Widget>,
  ) {}

  async createWidget(widget: NewWidgetDto) {
    const result = await this.widgetRepository.save(widget);

    return result;
  }

  async getWidgets() {
    return this.widgetRepository.find({ order: { name: 'ASC' } });
  }
}
