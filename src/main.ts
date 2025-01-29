import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS
  app.enableCors({
    origin: [
      'https://frontend-wheat-phi-56.vercel.app', // URL do frontend
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  // Porta dinâmica para o Render
  const port = process.env.PORT || 8080; // Render define a porta automaticamente
  await app.listen(port, () => {
    console.log(`Backend escutando na porta ${port}`);
  });
}

bootstrap();
