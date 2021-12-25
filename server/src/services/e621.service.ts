import { Injectable } from '@nestjs/common';
import E621 from 'e621';
import { e621PostToModel } from '../model/mapper/e621';

@Injectable()
export class E621Service {
  private readonly e621 = new E621();

  async searchPosts(tags: string | string[]) {
    const posts = await this.e621.posts.search({ tags });

    return posts.map((post) => e621PostToModel(post));
  }
}
