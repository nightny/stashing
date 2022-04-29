import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as fs from 'fs-extra';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { createHash, randomUUID } from 'crypto';

@Injectable()
export class BulkStorageService implements OnApplicationBootstrap {
  constructor(private readonly http: HttpService) {}

  async onApplicationBootstrap(): Promise<void> {
    await fs.mkdirs('./bulk-storage');
  }

  private readonly PROXY_URL = /http:\/\/localhost:3200\/api\/external\/proxy(?:\\.[a-zA-Z]+)?to=(.+)?/;

  async download(url: string) {
    // This matches the url against the proxy URL and de-proxies it if necessary.
    const match = url.match(this.PROXY_URL);
    if (match) {
      url = decodeURIComponent(match.groups[1]);
    }

    const response = await firstValueFrom(this.http.get(url, {
      method: 'GET', responseType: 'stream',
      headers: {
        'user-agent': 'Stashing/Linux v1.0.0',
      },
    }));

    // Writes the file to a temp file on bulk-storage
    const tmp = `./bulk-storage/tmp-${randomUUID()}`;
    const writer = fs.createWriteStream(tmp);
    const end = new Promise<void>((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    });
    response.data.pipe(writer);
    await end;

    // Generates a Base64URL-encoded SHA256 hash of the file and renames it.
    const tmpReader = fs.readFileSync(tmp);
    const hashSum = createHash('sha256');
    hashSum.update(tmpReader);
    const base64 = hashSum.digest('base64url');

    await fs.rename(tmp, `./bulk-storage/${base64}`);

    return base64;
  }
}
