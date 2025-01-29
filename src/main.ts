import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: '*', // Permite requisições do frontend React
    credentials: true, // Habilitar envio de cookies ou credenciais
  });

  await app.listen(3001);
}
bootstrap();
