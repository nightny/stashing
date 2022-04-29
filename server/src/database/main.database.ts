import { open } from 'sqlite';
import * as sqlite3 from 'sqlite3';

export async function openMainDatabase() {
  return open({
    filename: './stashing.main.db',
    driver: sqlite3.Database,
  })
}

export const MainDatabase = 'MAIN_SQLITE_DATABASE';

export default { provide: MainDatabase, useFactory: openMainDatabase };
