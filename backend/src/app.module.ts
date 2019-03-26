import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TestModule } from './modules/test/test.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';

const constructUri = async (configService: ConfigService) => {
  const DB_HOST = configService.get('DB_HOST');
  const DB_PORT = configService.get('DB_PORT');
  const DB_NAME = configService.get('DB_NAME');

  const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

  return { uri };
};

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: constructUri,
      inject: [ConfigService],
    }),
    TestModule,
    TransactionsModule,
    UserModule,
    AuthModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    const allowedOrigins = ['http://localhost:3000'];

    CorsMiddleware.configure({
      credentials: true,
      origin: allowedOrigins,
    });

    consumer.apply(CorsMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
