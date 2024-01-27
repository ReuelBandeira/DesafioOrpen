import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { SwaggerTheme, SwaggerThemeName } from 'swagger-themes'
import { AppModule } from './application/app/app.module'
import { HttpStatus, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(__dirname, '../.env') })

export const appConfig = {
  port: process.env.PORT || 3002,
  urlDev: process.env.URL_DEV || `http://localhost:${process.env.PORT}`,
  urlHomol: process.env.URL_HOMOL || `http://localhost:${process.env.PORT}`,
  urlProd: process.env.URL_PROD || `http://localhost:${process.env.PORT}`,
  swaggerTheme: process.env.SWAGGER_THEME || 'default',
  databaseURL: process.env.DATABASE_URL || 'mongodb://localhost:27017',
  databaseName: process.env.DATABASE_NAME || 'name'
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('OpenWeatherMap Service')
    .setDescription('OpenWeatherMap API Documentation')
    .setVersion('1.0.0')
    .addServer(appConfig.urlDev)
    .addServer(appConfig.urlHomol)
    .addServer(appConfig.urlProd)
    .build()

  const document = SwaggerModule.createDocument(app, config)

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
  const theme = new SwaggerTheme('v3')

  const options = {
    explorer: true,
    customCss: theme.getBuffer(appConfig.swaggerTheme as SwaggerThemeName)
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    })
  )

  SwaggerModule.setup('api', app, document, options)
  await app.listen(process.env.PORT)
}

bootstrap()
