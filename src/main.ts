import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS para aceitar requisições do frontend
  app.enableCors({
    origin: 'https://frontend-wheat-phi-56.vercel.app', // URL do frontend hospedado no Vercel
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permite cookies, se necessário
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
