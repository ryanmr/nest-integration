import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'widgets' })
export class Widget {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({
    name: 'name',
    type: 'text',
  })
  name!: string;

  @Column({
    name: 'size',
    type: 'int',
  })
  size!: number;
}
