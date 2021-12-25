import { Post } from 'e621';
import { E621PostModel } from '../ExternalPostModel';

export function e621PostModel(post: Post): E621PostModel {
  return {
    source: 'e621',
    id: `e621:post-${post.id}`,
    thumbnailUrl: post.sample.url,
    url: post.file.url,
    tags: post.tags,
    pools: post.pools,
    rating: post.rating,
    relationships: post.relationships,
    description: post.description,
  };
}
