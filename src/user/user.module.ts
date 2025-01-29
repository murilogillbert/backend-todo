import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Conecta o repositório de usuários
  providers: [UserService], // Registra o serviço UserService
  exports: [UserService], // Exporta o serviço UserService para outros módulos
})
export class UserModule {}
