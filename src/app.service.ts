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
