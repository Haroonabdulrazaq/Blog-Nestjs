import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  /* Swagger Documentation Set up */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nestjs Masterclass - Blog app API')
    .setDescription('Use the base API URL as http://localhost:3000')
    .setTermsOfService(' http://localhost:3000/terms-of-service')
    .setLicense(
      'MIT License',
      'https://github.com/Haroonabdulrazaq/Nestjs-intro/blob/main/README.md',
    )
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Set Up AWS SDK
  const configService = app.get(ConfigService);
  config.update({
    credentials: {
      accessKeyId: configService.get('appConfig.awsAcessKeyId'),
      secretAccessKey: configService.get('appConfig.awsSecretKey'),
    },
    region: configService.get('appConfig.awsRegion'),
  });

  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
