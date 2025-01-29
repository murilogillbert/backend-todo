import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Corrigindo CORS para permitir todas as origens ou apenas o frontend no Vercel
  app.enableCors({
    origin: [
      'https://frontend-wheat-phi-56.vercel.app',
      'https://frontend-git-main-murilogillberts-projects.vercel.app',
      'https://frontend-ejrfsp5lj-murilogillberts-projects.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Se estiver usando cookies/autenticação JWT
  });

  await app.listen(process.env.PORT || 8080);
}

bootstrap();
