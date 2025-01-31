import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  // 🟢 Buscar todas as tarefas de um usuário
  async findByUserId(userId: number) {
    const todos = await this.todoRepository.find({
      where: { user: { id: userId } },
    });

    // 🔄 Convertendo recurrenceDays de string para array antes de retornar
    return todos.map(todo => ({
      ...todo,
      recurrenceDays: todo.recurrenceDays ? todo.recurrenceDays.split(',').map(Number) : [],
    }));
  }

// 🟢 Criar uma nova tarefa
async create(userId: number, createTodoDto) {
  const { title, dueDate, category, reminder, recurrenceDays } = createTodoDto;

  if (!title) {
    throw new BadRequestException("O título da tarefa é obrigatório.");
  }

  console.log("🟢 Dados recebidos no backend:", createTodoDto); // ✅ LOG 1: Verificar os dados que chegam ao backend

  // ✅ Certifique-se de que `recurrenceDays` seja sempre uma string antes de salvar
  const recurrenceString = Array.isArray(recurrenceDays) ? recurrenceDays.join(",") : "";

  console.log("🟢 recurrenceDays convertido para string:", recurrenceString); // ✅ LOG 2: Verificar como será salvo

  const newTodo = this.todoRepository.create({
    title,
    user: { id: userId },
    dueDate,
    category,
    reminder,
    recurrenceDays: recurrenceString,
  });

  return this.todoRepository.save(newTodo);
}

  

// 🟢 Atualizar uma tarefa
async update(id: number, userId: number, updateTodoDto) {
  const todo = await this.todoRepository.findOne({
    where: { id, user: { id: userId } },
  });

  if (!todo) {
    throw new NotFoundException(`Tarefa com ID ${id} não encontrada ou não pertence a você.`);
  }

  console.log("🟢 Dados recebidos para atualização:", updateTodoDto); // ✅ LOG 3: Verificar os dados que chegam para atualizar

  // 🔥 Convertendo recurrenceDays para string antes de atualizar
  if (updateTodoDto.recurrenceDays) {
    updateTodoDto.recurrenceDays = updateTodoDto.recurrenceDays.join(",");
  }

  console.log("🟢 recurrenceDays após conversão:", updateTodoDto.recurrenceDays); // ✅ LOG 4: Verificar se a conversão ocorreu corretamente

  await this.todoRepository.update(id, updateTodoDto);
  return this.todoRepository.findOne({ where: { id } });
}


  // 🟢 Remover uma tarefa
  async remove(id: number, userId: number) {
    const todo = await this.todoRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!todo) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada ou não pertence a você.`);
    }

    await this.todoRepository.delete(id);
    return { message: 'Tarefa removida com sucesso' };
  }
}
