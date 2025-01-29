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

    if (!user || !user.password) {
        throw new UnauthorizedException('Credenciais inválidas.');
    }

    console.log("Senha digitada:", password); // DEBUG
    console.log("Senha armazenada no BD:", user.password); // DEBUG

    // Comparação segura com bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        console.log("Senha incorreta!"); // DEBUG
        throw new UnauthorizedException('Credenciais inválidas.');
    }

    console.log("Senha correta! Login autorizado."); // DEBUG

    return user;
}

  // Gera o token JWT após o login
  async login(user: any) {
    const payload = { username: user.name, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(userData: { name: string; email: string; password: string; phone: string }) {
    const { name, email, password, phone } = userData;

    // Verificar se o usuário já existe
    const existingUser = await this.userService.findByEmailOrName(email);
    if (existingUser) {
        throw new BadRequestException('Email já cadastrado.');
    }

    // 🔥 Criar um salt aleatório e hashear a senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log("Senha antes do hash:", password); // DEBUG
    console.log("Senha após hash:", hashedPassword); // DEBUG

    // Criar usuário no banco de dados
    const newUser = await this.userService.register(name, email, hashedPassword, phone);

    // Verifique se a senha foi salva corretamente
    console.log("Usuário criado:", newUser);

    return newUser;
}

}
