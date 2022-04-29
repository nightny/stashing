import { Inject, Injectable, Logger, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { IndexesDatabase } from '../../database/indexes.database';
import { Database } from 'sqlite';

@Injectable()
export class IndexesDatabaseService implements OnApplicationBootstrap, OnApplicationShutdown {
  private readonly logger = new Logger(IndexesDatabaseService.name);
  constructor(
    @Inject(IndexesDatabase)
    private readonly database: Database,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    this.logger.log('Running indexes database migrations');
    await this.database.migrate({
      migrationsPath: './migrations/indexes'
    }).catch(reason => this.logger.error('Indexes database migrations errored:', reason));;
    this.logger.log('Finished indexes database migrations');
  }

  async onApplicationShutdown(): Promise<void> {
    await this.database.close();
    this.logger.log('Closed indexes database');
  }
}
