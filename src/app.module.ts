import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres', // Tipo do banco de dados
      host: 'junction.proxy.rlwy.net', // Host público do banco
      port: 45544, // Porta pública fornecida
      username: 'postgres', // Usuário do banco
      password: 'HfwGnlZPmAwaeVEuZfFQHIGfkWFnttAj', // Senha fornecida
      database: 'railway', // Nome do banco de dados
      autoLoadEntities: true, // Carrega automaticamente as entidades
      synchronize: true, // Apenas para desenvolvimento (gera tabelas automaticamente)
      ssl: {
        rejectUnauthorized: false, // Importante para conexões externas seguras (SSL)
      },
    }),
    TodoModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
