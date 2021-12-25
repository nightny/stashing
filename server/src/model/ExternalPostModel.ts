export interface ExternalPostBaseModel {
  source: 'e621' | 'nhentai';
  id: string;
  thumbnailUrl: string;
}

export interface E621PostModel extends ExternalPostBaseModel {
  source: 'e621';
  url: string;
  tags: Record<string, string[]>;
  rating: string;
  relationships: any;
  pools: number[];
  description: string;
}

export interface NHentaiPostModel extends ExternalPostBaseModel {
  source: 'nhentai';
  tags: string[];
  urls: string[];
}

export type ExternalPostModel = E621PostModel | NHentaiPostModel;
