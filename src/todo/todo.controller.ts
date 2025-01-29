import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    return this.todoService.findByUserId(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTodoDto, @Req() req) {
    return this.todoService.create(req.user.userId, createTodoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: number, 
    @Body() updateTodoDto: any,
    @Req() req
  ) {
    return this.todoService.update(id, req.user.userId, updateTodoDto);
  }
  

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number, @Req() req) {
    return this.todoService.remove(id, req.user.userId);
  }
  
}
