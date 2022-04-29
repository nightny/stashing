import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { E621Service } from './services/external/e621.service';
import { NhentaiService } from './services/external/nhentai.service';
import { HttpModule } from '@nestjs/axios';
import { ExternalController } from './controllers/external.controller';
import { CollectionsController } from './controllers/collections.controller';
import { PostsController } from './controllers/posts.controller';
import { IndexesDatabaseService } from './services/database/indexes-database.service';
import { MainDatabaseService } from './services/database/main-database.service';
import { PostsService } from './services/entities/posts.service';
import { CollectionsService } from './services/entities/collections.service';
import { BulkStorageService } from './services/database/bulk-storage.service';
import IndexesDatabaseProvider from './database/indexes.database';
import MainDatabaseProvider from './database/main.database';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    CacheModule.register(),
    ServeStaticModule.forRoot({
      rootPath: './bulk-storage',
      serveRoot: 'content',
      serveStaticOptions: {
        index: false
      }
    }),
    HttpModule
  ],
  controllers: [
    AppController,
    ExternalController,
    CollectionsController,
    PostsController,
  ],
  providers: [
    E621Service,
    NhentaiService,
    MainDatabaseProvider,
    MainDatabaseService,
    IndexesDatabaseProvider,
    IndexesDatabaseService,
    PostsService,
    CollectionsService,
    BulkStorageService,
  ],
})
export class AppModule {
}
