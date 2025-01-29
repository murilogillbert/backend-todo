import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
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
}
