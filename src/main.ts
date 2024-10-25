import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// Pipe Validation apply the validation to app.
// whitelist remove the fileds we havent defined in our validation or DTO.