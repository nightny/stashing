import { Injectable } from '@nestjs/common';
import { MainDatabaseService } from '../database/main-database.service';
import SQL from 'sql-template-strings';
import { PostModel, Rating } from '../../model/PostModel';
import { TagModel } from '../../model/TagModel';

@Injectable()
export class PostsService {
  constructor(private readonly main: MainDatabaseService) {}

  async getById(id: number): Promise<PostModel> {
    const rawPost = await this.main.database.get(
      SQL`SELECT *
          FROM post
          WHERE id = ${id}`,
    );

    return {
      id: rawPost.id.toString(),
      collection: rawPost.collection?.toString(),
      rating: rawPost.rating,
      url: `http://localhost:3200/content/${rawPost.file_name}`,
      tags: JSON.parse(rawPost.tags),
    }
  }

  async insert(
    collection: string | null,
    rating: Rating,
    fileName: string,
    tags: TagModel,
    data: object = {},
    original: object = {},
  ): Promise<string> {
    const tagsJson = JSON.stringify(tags), dataJson = JSON.stringify(data), originalJson = JSON.stringify(original);
    await this.main.database.run(
      SQL`INSERT INTO post(collection, rating, file_name, tags, data, original)
          VALUES (${collection}, ${rating}, ${fileName}, ${tagsJson}, ${dataJson}, ${originalJson})`,
    );
    const { id } = await this.main.database.get(`SELECT last_insert_rowid() AS "id"`);
    return id.toString();
  }
}
