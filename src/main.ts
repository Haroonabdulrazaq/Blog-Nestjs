import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  const config = new DocumentBuilder()
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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
