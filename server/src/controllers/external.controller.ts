import {
  Body,
  CacheInterceptor,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ExternalPostBaseModel, ExternalPostModel } from '../model/ExternalPostModel';
import { E621Service } from '../services/external/e621.service';
import { NhentaiService } from '../services/external/nhentai.service';
import { HttpService } from '@nestjs/axios';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Controller('api/external')
@UseInterceptors(CacheInterceptor)
export class ExternalController {
  constructor(
    private readonly e621: E621Service,
    private readonly nhentai: NhentaiService,
    private readonly http: HttpService,
  ) {}

  private readonly siteMapper: Record<string, (query: string) => Promise<ExternalPostModel[]>> = {
    e621: (query: string) => this.e621.searchPosts(query),
    nhentai: (query: string) => this.nhentai.searchPosts(query),
  }

  @Post('searchPosts')
  async searchPosts(@Body('query') query: string, @Body('site') site?: string) {
    const success: ExternalPostModel[][] = [];
    const errors: any[] = [];

    if (site) {
      const fn = this.siteMapper[site];
      if (!fn) {
        errors.push(`Unknown site ${site}`)
      }
      await fn(query).then(
        (value) => success.push(value),
        (reason) => errors.push(reason),
      );
    } else {
      await Promise.all(
        Object.values(this.siteMapper).map(value => value(query)).map((p) =>
          p.then(
            (value) => success.push(value),
            (reason) => errors.push(reason),
          ),
        ),
      );
    }

    const posts: ExternalPostBaseModel[] = [];
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

  @Get('e621/:id')
  async getE621(@Param('id') id: string) {
    return this.e621.getPost(id);
  }

  @Get(['proxy', 'proxy.png', 'proxy.jpg', 'proxy.jpeg'])
  async proxy(
    @Headers() rawHeaders: any,
    @Query('to') url: string,
    @Res() response: Response,
  ) {
    const headers = ExternalController.pickInputHeaders(rawHeaders);
    const proxiedResponse = await firstValueFrom(
      this.http.get(url, { headers, responseType: 'stream' }),
    );
    const pickOutputHeaders = ExternalController.pickOutputHeaders(proxiedResponse.headers);
    for (const key in pickOutputHeaders) {
      response.setHeader(key, proxiedResponse.headers[key]);
    }
    response.contentType(proxiedResponse.headers['content-type']);
    response.status(proxiedResponse.status);
    proxiedResponse.data.pipe(response);
  }

  static pickInputHeaders(rawHeaders: any): any {
    return Object.fromEntries(Object.entries(rawHeaders).filter(([k]) => this.acceptableInputHeaders.includes(k)));
  }

  private static readonly acceptableInputHeaders = [
    'user-agent',
    'accept',
    'accept-language',
  ];

  static pickOutputHeaders(rawHeaders: any): any {
    return Object.fromEntries(Object.entries(rawHeaders).filter(([k]) => this.acceptableOutputHeaders.includes(k)));
  }

  private static readonly acceptableOutputHeaders = [
    'date',
    'content-length',
    'last-modified',
    'expires',
    'cache-control',
  ];
}
