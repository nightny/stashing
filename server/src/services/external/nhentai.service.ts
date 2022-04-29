import { Injectable } from '@nestjs/common';
import { API } from 'nhentai-api';
import { nhentaiBookModel } from '../../model/mapper/nhentai';

@Injectable()
export class NhentaiService {
  private readonly api = new API(undefined);

  async searchPosts(query: string) {
    if (!query.length) {
      return [];
    }
    const search = await this.api.search(query);
    return search.books.map((book) => nhentaiBookModel(book, this.api));
  }
}
