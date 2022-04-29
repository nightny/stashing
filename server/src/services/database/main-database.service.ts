import { Inject, Injectable, Logger, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { Database } from 'sqlite';
import { MainDatabase } from '../../database/main.database';

@Injectable()
export class MainDatabaseService implements OnApplicationBootstrap, OnApplicationShutdown {
  private readonly logger = new Logger(MainDatabaseService.name);

  constructor(
    @Inject(MainDatabase)
    readonly database: Database,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    this.logger.log('Running main database migrations');
    await this.database.migrate({
      migrationsPath: './migrations/main',
    }).catch(reason => this.logger.error('Main database migrations errored:', reason));
    this.logger.log('Finished main database migrations');
  }

  async onApplicationShutdown(): Promise<void> {
    await this.database.close();
    this.logger.log('Closed main database');
  }
}
