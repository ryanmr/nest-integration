import { TestingModuleBuilder, Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';
import { setupSwagger } from '../src/library/setup-swagger';

/**
 * Similar to the general purpose `bootstrap` function for Nest.
 *
 * This bootstraps the root testing module and also attaches Swagger to it.
 *
 * Try to keep this in parity with your `bootstrap` function for best results.
 *
 * @returns app
 */
export async function getTestModule() {
  const test: TestingModuleBuilder = Test.createTestingModule({
    imports: [AppModule],
  });

  const moduleFixture: TestingModule = await test.compile();

  const app = moduleFixture.createNestApplication();

  setupSwagger(app);

  await app.init();

  return app;
}
