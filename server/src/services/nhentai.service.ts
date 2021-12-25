import { Injectable } from '@nestjs/common';
import { API } from 'nhentai-api';

@Injectable()
export class NhentaiService {
  private readonly api = new API(null);

  async searchPosts(query: string) {
    //let search = await this.api.search(query);
  }
}
