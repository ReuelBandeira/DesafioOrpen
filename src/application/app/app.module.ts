import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ValidationParam } from '../middlewares/validationParam'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { RemoveWhitespaceInterceptor } from '../middlewares/ValidWhiteSpacing'
import { OrpenModule } from '../orpen/orpen.module'


@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RemoveWhitespaceInterceptor
    }
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      retryWrites: true,
      w: 'majority',
      dbName: process.env.DATABASE_NAME
    }),
    OrpenModule

  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidationParam).forRoutes('orpen')
  }
}
