import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  // Busca todas as tarefas pelo ID do usuário
  async findByUserId(userId: number): Promise<Todo[]> {
    return this.todoRepository.find({
      where: { userId }, // Busca pelo userId diretamente
    });
  }

  // Cria uma nova tarefa
  async create(userId: number, createTodoDto: Partial<Todo>): Promise<Todo> {
    const todo = this.todoRepository.create({ ...createTodoDto, userId });
    return this.todoRepository.save(todo);
  }

  // Atualiza o status de uma tarefa
  async update(id: number, completed: boolean): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new Error('Tarefa não encontrada');
    }
    todo.completed = completed;
    return this.todoRepository.save(todo);
  }

  // Remove uma tarefa
  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
