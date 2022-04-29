import { TagModel } from './TagModel';

export enum Rating {
  EXPLICIT, QUESTIONABLE, SAFE
}

export interface PostModel {
  id: string;

  collection: string | null;

  rating: Rating;

  url: string;

  tags: TagModel;
}
