import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Corrigindo CORS para permitir todas as origens ou apenas o frontend no Vercel
  app.enableCors({
    origin: ['*'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Se estiver usando cookies/autenticação JWT
  });

  await app.listen(process.env.PORT || 8080);
}

bootstrap();
