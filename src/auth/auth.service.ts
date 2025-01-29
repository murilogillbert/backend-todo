import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Valida as credenciais do usuário
  async validateUser(identifier: string, password: string) {
    const user = await this.userService.findByEmailOrName(identifier);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Credenciais inválidas.');
  }

  // Gera o token JWT após o login
  async login(user: any) {
    const payload = { username: user.name, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  // 🚀 Cadastro de usuário corrigido
  async register(userData: { name: string; email: string; password: string; phone: string }) {
    const { name, email, password, phone } = userData;

    // Verificar se o usuário já existe
    const existingUser = await this.userService.findByEmailOrName(email);
    if (existingUser) {
      throw new BadRequestException('Email já cadastrado.');
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Chamando o método register corretamente com os 4 argumentos
    return this.userService.register(name, email, hashedPassword, phone);
  }
}
