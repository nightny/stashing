import { NHentaiPostModel } from '../ExternalPostModel';
import { API, Book, Image } from 'nhentai-api';

function imageProxyURL(api: API, image: Image) {
  const ext = image.type.extension;
  const encodedUrl = encodeURIComponent(api.getImageURL(image));
  return `http://localhost:3200/api/external/proxy.${ext}?to=${encodedUrl}`;
}

export function nhentaiBookModel(book: Book, api: API): NHentaiPostModel {
  return {
    source: 'nhentai',
    id: `${book.id}`,
    thumbnailUrl: imageProxyURL(api, book.cover),
    tags: book.tags.map((it) => it.name),
    urls: book.pages.map((it) => imageProxyURL(api, it)),
  };
}
