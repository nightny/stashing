import { Injectable } from '@nestjs/common';
import E621 from 'e621';
import { e621PostModel } from '../../model/mapper/e621';

@Injectable()
export class E621Service {
  private readonly e621 = new E621();

  async searchPosts(tags: string | string[]) {
    const posts = await this.e621.posts.search({ tags });
    return posts.map(e621PostModel);
  }

  async getPost(id: string) {
    return this.e621.posts.get(id).then(e621PostModel);
  }
}
