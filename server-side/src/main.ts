import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './logger';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new AppLogger(),
  });
  app.enableCors({
    origin: '*', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true, // Enable if using cookies
  });

  app.useGlobalPipes(new ValidationPipe());

  app.useLogger(app.get(AppLogger));
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3002);
}
bootstrap();
