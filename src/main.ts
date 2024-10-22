import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true , // remove chaves que não pertence ao DTO
    forbidNonWhitelisted: true, // Gera erro se chave não existe no DTO
    transform: false, // tenta converte os dados de param e dto, para não ser sempre string 
  }));
  
  await app.listen(3000);
}
bootstrap();
