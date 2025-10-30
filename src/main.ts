import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // To eliminate the properties which are not defined in schema or entity
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
