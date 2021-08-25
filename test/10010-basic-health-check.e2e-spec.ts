import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { EntityManager } from 'typeorm';
import { getTestModule } from './utils';

describe('10010 Basic Health Check', () => {
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

  it('/ (GET)', async () => {
    const result = await request(app.getHttpServer()).get('/').expect(200);
    expect(result.body).toEqual(
      expect.objectContaining({ project: 'live-integration' }),
    );
  });
});
