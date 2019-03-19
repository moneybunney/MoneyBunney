import { NestFactory } from '@nestjs/core';;
import { AppModule } from './app.module';
import { DispatchError } from './common/filters/DispatchError';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 8080;
  // Basic error management
  app.useGlobalFilters(new DispatchError());
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

  // tslint:disable-next-line:no-console
  console.log('Listening on http://localhost:' + port);
  await app.listen(port);
}
bootstrap();
