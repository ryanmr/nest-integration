import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Widget } from './widget.entity';
import { WidgetsController } from './widgets.controller';
import { WidgetsService } from './widgets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Widget])],
  controllers: [WidgetsController],
  providers: [WidgetsService],
})
export class WidgetsModule {}
