import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { E621Service } from './services/e621.service';
import { NhentaiService } from './services/nhentai.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [E621Service, NhentaiService],
})
export class AppModule {}
