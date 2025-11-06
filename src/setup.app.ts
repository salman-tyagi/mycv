import { ValidationPipe } from '@nestjs/common';

export const setupApp = (app: any) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // To eliminate the properties which are not defined in schema or entity
    }),
  );
};
