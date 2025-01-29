import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS para permitir apenas o frontend hospedado no Vercel
  app.enableCors({
    origin: [
      'https://frontend-wheat-phi-56.vercel.app', // URL do frontend
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Permite cookies e autenticação via JWT
  });

  await app.listen(process.env.PORT || 8080);
}

bootstrap();
