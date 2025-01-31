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

  console.log("🟢 Dados recebidos no backend:", createTodoDto); // ✅ LOG 1

  // ✅ Certifique-se de que `recurrenceDays` seja sempre uma string antes de salvar
  let recurrenceString = "";
  if (Array.isArray(recurrenceDays)) {
    recurrenceString = recurrenceDays.length > 0 ? recurrenceDays.join(",") : "";
  }

  console.log("🟢 recurrenceDays convertido para string:", recurrenceString); // ✅ LOG 2

  const newTodo = this.todoRepository.create({
    title,
    user: { id: userId },
    dueDate,
    category,
    reminder,
    recurrenceDays: recurrenceString,
  });

  try {
    return await this.todoRepository.save(newTodo);
  } catch (error) {
    console.error("❌ Erro ao salvar a tarefa:", error); // ✅ LOG 3
    throw new Error("Erro ao salvar a tarefa no banco de dados.");
  }
}  

// 🟢 Atualizar uma tarefa
async update(id: number, userId: number, updateTodoDto) {
  const todo = await this.todoRepository.findOne({
    where: { id, user: { id: userId } },
  });

  if (!todo) {
    throw new NotFoundException(`Tarefa com ID ${id} não encontrada ou não pertence a você.`);
  }

  console.log("🟢 Dados recebidos para atualização:", updateTodoDto); // ✅ LOG 4

  // 🔥 Convertendo recurrenceDays para string antes de atualizar
  if (updateTodoDto.recurrenceDays && Array.isArray(updateTodoDto.recurrenceDays)) {
    updateTodoDto.recurrenceDays = updateTodoDto.recurrenceDays.join(",");
  } else {
    updateTodoDto.recurrenceDays = "";
  }

  console.log("🟢 recurrenceDays após conversão:", updateTodoDto.recurrenceDays); // ✅ LOG 5

  try {
    await this.todoRepository.update(id, updateTodoDto);
    return await this.todoRepository.findOne({ where: { id } });
  } catch (error) {
    console.error("❌ Erro ao atualizar a tarefa:", error); // ✅ LOG 6
    throw new Error("Erro ao atualizar a tarefa no banco de dados.");
  }
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
