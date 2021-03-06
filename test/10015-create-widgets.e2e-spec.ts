import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { EntityManager } from 'typeorm';
import { NewWidgetDto } from 'src/widgets/new-widget.dto';
import { getTestModule } from './utils';

describe('10015 Create Widgets', () => {
  let app: INestApplication;
  let entityManager: EntityManager;

  beforeAll(async () => {
    app = await getTestModule();
    entityManager = app.get(EntityManager);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/widgets (POST)', async () => {
    const payload: NewWidgetDto = {
      name: "bob's widgets",
      size: 1337,
    };

    const result = await request(app.getHttpServer())
      .post('/widgets')
      .send(payload)
      .expect(201);

    expect(result.body).toEqual(
      expect.objectContaining({ name: "bob's widgets", size: 1337 }),
    );

    // get data from the database
    // to verify that the controllers/services
    // did what was expected
    const data = await entityManager.query(
      'SELECT * FROM widgets w WHERE w.id = $1',
      [result.body.id],
    );

    // assert
    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "bob's widgets" }),
      ]),
    );
  });
});
