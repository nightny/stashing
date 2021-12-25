import { Body, Controller, Post } from '@nestjs/common';
import { E621Service } from './services/e621.service';
import { PostModel } from './model/PostModel';

@Controller()
export class AppController {
  constructor(private readonly e621: E621Service) {}

  @Post('/searchPosts')
  async searchPosts(@Body('query') query: string) {
    const success: PostModel[][] = [];
    const errors: any[] = [];

    await Promise.all(
      [this.e621.searchPosts(query)].map((p) =>
        p.then(
          (value) => success.push(value),
          (reason) => errors.push(reason),
        ),
      ),
    );

    const posts: PostModel[] = [];
    while (success.length > 1) {
      const arr = success.shift();
      if (arr.length) {
        posts.push(arr.shift());
        if (arr.length) {
          success.push(arr);
        }
      }
    }
    if (success.length == 1) {
      posts.push(...success[0]);
    }

    return { posts, errors };
  }
}
