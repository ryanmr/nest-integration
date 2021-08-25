import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { EntityManager } from 'typeorm';
import { getTestModule } from './utils';

describe('10001 Swagger', () => {
  let app: INestApplication;
  let entityManager: EntityManager;

  beforeAll(async () => {
    app = await getTestModule();
    entityManager = app.get(EntityManager);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/ (GET)', async () => {
    const result = await request(app.getHttpServer()).get('/api/').expect(200);

    expect(result.text).toContain('Swagger UI');
  });

  it('/api/ (GET)', async () => {
    const result = await request(app.getHttpServer()).get('/api/').expect(200);

    expect(result.text).toContain('Swagger UI');
  });

  it('/api-json (GET)', async () => {
    const result = await request(app.getHttpServer())
      .get('/api-json')
      .expect(200);

    expect(result.body).toEqual(expect.objectContaining({ openapi: '3.0.0' }));
  });
});
