import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Lista de URLs permitidas
  const allowedOrigins = [
    'https://frontend-wheat-phi-56.vercel.app',
    'https://frontend-git-main-murilogillberts-projects.vercel.app',
    'https://frontend-ejrfsp5lj-murilogillberts-projects.vercel.app',
  ];

  // Configuração do CORS
  app.enableCors({
    origin: (origin, callback) => {
      // Permitir origens específicas ou nenhuma origem (Postman, por exemplo)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permite cookies, se necessário
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
