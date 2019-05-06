import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DispatchError } from './common/filters/DispatchError';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from './modules/config/config.service';
import { Logger } from './modules/logger/logger.service';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = app.get(Logger);
  const {
    REACT_APP_BACKEND_HOST,
    REACT_APP_BACKEND_PORT,
  } = configService.config;
  // Basic error management
  app.useGlobalFilters(new DispatchError());
  app.use(cookieParser());
  // Api which lists all endpoints and allows to send request, very convenient. Available through 'localhost:8080/api/index/#/'
  const options = new DocumentBuilder()
    .setTitle('User requests')
    .setDescription('Basic request management')
    .setVersion('1.0')
    .addTag('nestjs')
    .addBearerAuth('Authorization', 'header')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/index', app, document);

  logger.log(
    'Listening on http://' +
      REACT_APP_BACKEND_HOST +
      ':' +
      REACT_APP_BACKEND_PORT,
  );
  await app.listen(REACT_APP_BACKEND_PORT);
}
bootstrap();
