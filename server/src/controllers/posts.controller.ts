import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from '../services/entities/posts.service';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly posts: PostsService) {}

  @Post()
  async newPost(@Body() body: any) {
    if (body.url) {

    }
    // This will probably require file insertion shenanigans
    const id = await this.posts.insert(
      body.collection ?? null,
      body.rating,
      body.fileName,
      body.tags,
      {},
      body
    );

    return { id };
  }
}
