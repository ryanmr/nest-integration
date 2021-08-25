import { ApiProperty } from '@nestjs/swagger';

export class NewWidgetDto {
  @ApiProperty({})
  name!: string;

  @ApiProperty({})
  size!: number;
}
