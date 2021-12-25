import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.getHttpAdapter().getInstance().disable('x-powered-by');
  await app.listen(3200);
}
bootstrap();
