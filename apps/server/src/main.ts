import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

// This bootstraps the AppModule, the main module of the app.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Approve using validation pipes on the app module.
  app.useGlobalPipes(
    new ValidationPipe({

      // The validator will remove any properties that do not
      //  use any any validation decorators.
      whitelist: true,
    })
  );

  // Allows resources to be requested from another domain, 
  //  from the client app.
  app.enableCors();

  // The port for the server app will be 3333.
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
