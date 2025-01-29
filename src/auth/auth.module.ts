import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module'; // Importação do módulo de usuários

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'minha-chave-secreta', // Use variáveis de ambiente em produção
      signOptions: { expiresIn: '15d' }, // Configura o JWT para expirar em 15 dias
    }),
    UserModule, // Importação do módulo de usuários para resolver UserService
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
