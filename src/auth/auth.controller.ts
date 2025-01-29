import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // Define o prefixo para todas as rotas dentro deste controller
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('identifier') identifier: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.validateUser(identifier, password);
    return this.authService.login(user);
  }

  @Post('register') // 📌 Adicionando a rota correta para registro de usuários
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('phone') phone: string,
  ) {
    return this.authService.register({ name, email, password, phone });
  }
}
