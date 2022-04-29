import { Database, open } from 'sqlite';
import * as sqlite3 from 'sqlite3';

export async function openIndexesDatabase(): Promise<Database> {
  return open({
    filename: './stashing.indexes.db',
    driver: sqlite3.Database,
  })
}

export const IndexesDatabase = 'INDEXES_SQLITE_DATABASE';

export default { provide: IndexesDatabase, useFactory: openIndexesDatabase };
