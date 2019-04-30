import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TestModule } from './modules/test/test.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';

const {
  REACT_APP_PORT,
  REACT_APP_HOST
 } = process.env;

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.databaseUri,
      }),
      inject: [ConfigService],
    }),
    TestModule,
    TransactionsModule,
    UserModule,
    AuthModule,
    TransactionsModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    const allowedOrigins = [
      `http://${REACT_APP_HOST}:${REACT_APP_PORT}`,
      `https://${REACT_APP_HOST}:${REACT_APP_PORT}`,
      `http://${REACT_APP_HOST}`,
      `https://${REACT_APP_HOST}`
    ];

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
