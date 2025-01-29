import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Rota de cadastro
  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('phone') phone: string,
  ) {
    return this.userService.register(name, email, password, phone);
  }

  // Rota de login
  @Post('login')
  async login(
    @Body('identifier') identifier: string, // Nome ou email
    @Body('password') password: string,
  ) {
    const user = await this.userService.login(identifier, password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return { message: 'Login successful', user };
  }
}
