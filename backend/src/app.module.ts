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
import { Logger } from './modules/logger/logger.service';
import { LoggerModule } from './modules/logger/logger.module';

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
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    const { REACT_APP_HOST, REACT_APP_PORT } = this.configService.config;
    const allowedOrigins = [
      `http://${REACT_APP_HOST}:${REACT_APP_PORT}`,
      `https://${REACT_APP_HOST}:${REACT_APP_PORT}`,
      `http://${REACT_APP_HOST}`,
      `https://${REACT_APP_HOST}`,
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
