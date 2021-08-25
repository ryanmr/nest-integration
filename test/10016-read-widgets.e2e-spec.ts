import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { EntityManager, Repository } from 'typeorm';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Widget } from '../src/widgets/widget.entity';
import { NewWidgetDto } from '../src/widgets/new-widget.dto';
import { getTestModule } from './utils';

describe('10016 Read Widgets', () => {
  let app: INestApplication;
  let entityManager: EntityManager;

  beforeAll(async () => {
    app = await getTestModule();
    entityManager = app.get(EntityManager);
  });

  beforeEach(async () => {
    entityManager.query('TRUNCATE widgets;');
  });

  afterAll(async () => {
    await app.close();
  });

  it('/widgets (GET)', async () => {
    const repo: Repository<Widget> = app.get<Repository<Widget>>(
      getRepositoryToken(Widget),
    );

    const sample: NewWidgetDto[] = [
      { name: 'w-1', size: 123 },
      { name: 'w-2', size: 29048 },
      { name: 'w-3', size: 0 },
    ];

    await Promise.all(sample.map((newWidget) => repo.save(newWidget)));

    const result = await request(app.getHttpServer())
      .get('/widgets')
      .expect(200);

    expect(result.body.length).toEqual(3);

    expect(result.body).toEqual(
      expect.arrayContaining([expect.objectContaining({ name: 'w-1' })]),
    );
  });
});
