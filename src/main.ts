import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Registers pipes as global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Only accepts data according to the DTO.
    }),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  await app.listen(8080);
}
bootstrap();
