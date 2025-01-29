import { Injectable, UnauthorizedException } from '@nestjs/common';
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
}
