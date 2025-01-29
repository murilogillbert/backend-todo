import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  async findByEmailOrName(identifier: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: [
        { email: identifier },
        { name: identifier },
      ],
    });
  }
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Cadastro de usuário
  async register(name: string, email: string, password: string, phone: string): Promise<User> {
    const existingEmail = await this.userRepository.findOne({ where: { email } });
    if (existingEmail) {
      throw new BadRequestException('Email já está cadastrado.');
    }

    const existingPhone = await this.userRepository.findOne({ where: { phone } });
    if (existingPhone) {
      throw new BadRequestException('Celular já está cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ name, email, password: hashedPassword, phone });
    return this.userRepository.save(newUser);
  }
  

  // Login de usuário
  async login(identifier: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: [{ name: identifier }, { email: identifier }], // Busca por nome ou email
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user; // Login bem-sucedido
    }

    return null; // Falha no login
  }
}
