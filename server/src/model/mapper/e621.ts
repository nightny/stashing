import { Post } from 'e621';
import { PostModel } from '../PostModel';

export function e621PostToModel(post: Post): PostModel {
  return {
    source: 'e621',
    id: `e621:post-${post.id}`,
    thumbnailUrl: post.preview.url,
  };
}
