import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { E621Service } from './services/e621.service';
import { NhentaiService } from './services/nhentai.service';
import { HttpModule } from '@nestjs/axios';
import { ExternalController } from './controllers/external.controller';

@Module({
  imports: [HttpModule],
  controllers: [AppController, ExternalController],
  providers: [E621Service, NhentaiService],
})
export class AppModule {}
