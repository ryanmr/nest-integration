import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { EntityManager } from 'typeorm';

export class ColophonDto {
  project!: string;
  time!: number;
}

interface DbHealthResult {
  Result: number;
}

@Injectable()
export class AppService {
  constructor(private readonly entityManager: EntityManager) {}

  /**
   * What is colophon?
   *
   * @see https://en.wikipedia.org/wiki/Colophon_(publishing)
   *
   * Beyond that, this represents the app's health check. Your service mesh might ask this, how are you doing?
   *
   * We have this asking the database in turn, how are you, periodically as well.
   *
   * @returns colophon
   */
  async getColophon(): Promise<ColophonDto> {
    const dbHealth = await this.entityManager.query('SELECT 1 as "Result";');

    if (
      !(Array.isArray(dbHealth) && (dbHealth[0] as DbHealthResult).Result === 1)
    ) {
      throw new ServiceUnavailableException();
    }

    const colophon: ColophonDto = {
      project: 'live-integration',
      time: Date.now(),
    };

    return colophon;
  }
}
