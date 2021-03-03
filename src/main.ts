import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';

import { populate } from './setup/populate-database';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: serverConfig.origin });
    logger.log(`Accepting requests from "${serverConfig.origin}"`);
  }

  const port = process.env.PORT || serverConfig.port;
  console.log(port);
  await app.listen(port);
  logger.log(`Application listing on port ${port}`);

  // testing
  // populate();
}
bootstrap();
